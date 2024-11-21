---
slug: /net/tcp-ip/12
---

# Chapter 12 TCP: The Transmission Protocol(Preliminaries)

## 12.1 Introduction

The foundation of *Information theory* was created by Claude Shannon in 1984 provide a inspiration for information error handle:

1. error-correcting
2. ARQ (*Automatic Repeat Request*)

### 12.1.1 ARQ and Retransmission

There maybe encounter some information problems in the communication in multihop cascade of several:

1. packet reordering
2. packet duplication
3. packet erasures(drops)

TCP is an error-correcting protocol which will cope with these problems above.

---

Packet reordering and duplication solution

![sequence number](http://img.wukaipeng.com/2023/0923-152739-sequence%20number.png)

Packet erasure(drops) solution:

<img src="http://img.wukaipeng.com/2023/0923-152739-packet%20erasures(drops).png" alt="packet erasures(drops)" />

---

- TCP is reliable but inefficient.
- **Stop and wait**: sender inject single packet into communication path and have to waiting ACK.
- Throughput performance: data sent on the network per unit time. It is proportional to $M/R$, 
  - $M$​ : packet size; $R$: round-trip time(RTT)
  - For a fixed-size packet, as $R$​ goes up:arrow_heading_up: , the throughput goes down:arrow_heading_down: . (Assuming not packet lose or damaged in transit)
  - The network in idle also has lower efficiency.

Sender need to consider:

1. when to inject packet into network
2. how long for timer to waiting ACK
3. keep the packet copy for retransmission

Receiver need to consider:

1. distinguish repeated packet
2. Maintain a sophisticated buffering(Packet Storage): hold “out-of-sequence”(The packet is not away coming in order or completely)

Other issue:

1. Receiver is slower than the sender. (Receiver will drop the packet because can’t dispose overwhelming packet from sender)
2. Network infrastructure(e.g. routers in middle) can’t copy with rate of data the sender and receiver wish to use.

![Consider](http://img.wukaipeng.com/2023/0923-152740-Consider.png)

### 12.1.2 Windows of Packets and Sliding Windows

***window***: the collections of packets which have been sent but not yet be acknowledged.

***window size***: number of packets in the window.

:speech_balloon: Window is like canteen window which controls who be serviced and has three state: not yet service/servicing/serviced.

![](http://img.wukaipeng.com/2023/0923-152740-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20211122201720.jpg)

Window can combat many problems: 

- At sender:
  - what packets can be released.
  - what packets are awaiting ACK.
  - what packets cannot yet be sent.
- At receiver:
  - what packets have been received and acknowledged.
  - what packets are expected.
  - how much memory has been allocated to hold them.

Still not resolved:

- how large the window should be.
- data transfer rate.

### 12.1.3 Variable Windows: Flow Control and Congestion Control

***Flow Control***: the way to force the sender to slow down. Two types:

1. *Rate-based* flow control: fixed rate allocation which is not allowed to be exceeded.
2. *Window-based* flow control: dynamic rate 
   1. *Window advertisement*(or *window update*): the method to signal the sender how large a window to use.
   2. Window advertisement and ACK are together in a single packet in practice.

---

Transfer rate: $SW/R$ 

1. $S$: packet size in bits
2. $W$: window size
3. $R$: RTT

---

***Congestion Control***: the special form of flow control which copies the data transfer rate between sender and receiver. 

:question: The problem of congestion control in datagram-style networks, and more generally *queuing theory* to which it is closely related, has remained a major research topic for years, and it is unlikely to ever be solved completely for all circumstances.

---

- *Explicit* signaling: have a protocol-specific field. e.g. window advertisement.

- *Implicit* signaling: need other evidence.

### 12.1.4 Setting the Retransmission Timeout

***Retransmission timeout***: the time to wait before concluding that a packet has been lost and should be resent.

To determine retransmission timeout:

- the time to send the packet.
- the time receiver processes it and sends an ACK.
- the time for ACK to travel back to the sender.
- the time the sender processes the ACK.

:sob: None of these times are known with certainty!

:tired_face: These times vary over time as additional load is added to or removed from the end hosts or routers.

---

*Round-trip-time estimation*: try to estimate the time which can’t exactly get but approximately approach. 

The timeout is larger than time by round-trip-time estimation.

## 12.2 Introduction to TCP

### 12.2.1 The TCP Service Model

**TCP provides a connection-oriented, reliable, byte streaming service.**

- Connection-oriented: Two endpoints have to establish a TCP connection before exchanging data.
- Byte streaming: Each endpoint individually chooses write or read extent.

### 12.2.2 Reliability in TCP

**Packetization** take the sending application’s stream of bytes into a packet that IP can carry.

- Packet contain sequence number which allow packet have arbitrary size.

**Repacketization** combine packets.

**Segment** The chunk from sending application’s data separated by TCP.

---

TCP maintain a mandatory checksum on its header, any associated application data, and fields from the IP header.

The receiving packet may acknowledge previous packet so as to help the sender with its congestion control computation.

---

:large_blue_circle: A group of segments own **one timer**  

:arrow_right: Timer set when window of data are sent 

:arrow_right: Timeout update when receive acknowledge 

:arrow_right_hook: Retransmission if acknowledge not be receive in time.

---

Receiver not send acknowledge immediately and it will delay a fraction of second.

The ACKs used by TCP are cumulative in the sense that an ACK indicating byte number N implies that all bytes up to number N(but not including it) have already received successfully.

If an ACK packet loss, a subsequent ACK are sufficient to acknowledge the previous segment.

---

IP protocol didn’t provide duplicate elimination or guarantee correct ordering.

TCP will maintain a large sequence number in order to provide integral and correct order data to application.

## 12.3 TCP Header and Encapsulation

![](http://img.wukaipeng.com/2023/0923-152740-image-20211130094521130.png)

The length of TCP Header:

- 20 bytes;
- 60 bytes with options.

TCP Data is optional. Without TCP Data:

- *Pure ACK* just to acknowledge the receive data.
- *Window update* just to change the window size.

![](http://img.wukaipeng.com/2023/0923-152741-image-20211130094526675.png)

Source Port & Destination Port + IP address: ***Socket***

**TCP numbers each *byte* with a sequence number**

SYN segment: TCP initial connection segment which not using 0 or 1 rather then a random number(**initial sequence number(ISB)**) as sequence number because of secure measure.

ACK don’t consume sequence number.

---

1. **CWR** Congestion Window Reduced(The sender reduced its send rate)
2. **ECE** ECN Echo(the sender received an earlier congestion notification)
3. **URG** Urgent(The *Urgent Pointer* field is valid &mdash; rarely used)
4. **ACK** Acknowledge (The *Acknowledge Number* field is valid &mdash; always on after a connection is established)
5. **PSH** Push (The receiver should pass this data to the application as soon as possible &mdash; not reliably implemented or used)
6. **RST** Rest the connection (connection abort, usually because of an error)
7. **SYN** Synchronize sequence numbers to initiate a connection
8. **FIN** The sender of the segment is finished sending data to its peer
