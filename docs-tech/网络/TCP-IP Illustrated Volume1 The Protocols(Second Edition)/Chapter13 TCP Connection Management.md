---
slug: /net/tcp-ip/13
---



# Chapter 13 TCP Connection Management

## 13.2 TCP Connection Establishment and Termination

![](http://img.wukaipeng.com/2023/0923-152843-image-20211207090926395.png)

### 13.2.1 TCP Half-Close

![](http://img.wukaipeng.com/2023/0923-152844-image-20211207181708996.png)

### 13.2.2 Simultaneous Open and Close

Simultaneous Open:

![](http://img.wukaipeng.com/2023/0923-152844-image-20211207185139664.png)

Simultaneously Close:

![](http://img.wukaipeng.com/2023/0923-152845-image-20211207185149233.png)

### 13.2.3 Initial Sequence Number(ISN)

ISN is **randomly increase**:

- Identification: discriminate each other TCP connection. (The client will retransmission new SYN to establish new connection if old SYN spin for long, the old SYN will reenter the connection if ISN isn’t varied)
- Security:  attacker can forge a TCP segment according 4-Tuple(pair of IP address & port) to disrupt a TCP connection. Random ISN can repels this malicious attack. (Another approach is make the port ephemeral.)

### 13.2.4 Example

Source: 10.95.114.49

Destination: 10.95.114.129 80

Connection-Send(HaHaHa)-Close

```json
[
  {
    "_index": "packets-2021-12-13",
    "_type": "doc",
    "_score": null,
    "_source": {
      "layers": {
        "frame": {
          "frame.interface_id": "0",
          "frame.interface_id_tree": {
            "frame.interface_name": "\\Device\\NPF_{A286F08E-8003-48D6-A82A-7BE6C6F0DEFF}",
            "frame.interface_description": "以太网"
          },
          "frame.encap_type": "1",
          "frame.time": "Dec 13, 2021 11:31:35.486112000 中国标准时间",
          "frame.offset_shift": "0.000000000",
          "frame.time_epoch": "1639366295.486112000",
          "frame.time_delta": "0.061865000",
          "frame.time_delta_displayed": "0.000000000",
          "frame.time_relative": "34.220135000",
          "frame.number": "2788",
          "frame.len": "66",
          "frame.cap_len": "66",
          "frame.marked": "0",
          "frame.ignored": "0",
          "frame.protocols": "eth:ethertype:ip:tcp",
          "frame.coloring_rule.name": "TCP SYN/FIN",
          "frame.coloring_rule.string": "tcp.flags & 0x02 || tcp.flags.fin == 1"
        },
        "eth": {
          "eth.dst": "6c:4b:90:44:ef:cf",
          "eth.dst_tree": {
            "eth.dst_resolved": "LiteON_44:ef:cf",
            "eth.dst.oui": "7097232",
            "eth.dst.oui_resolved": "LiteON",
            "eth.addr": "6c:4b:90:44:ef:cf",
            "eth.addr_resolved": "LiteON_44:ef:cf",
            "eth.addr.oui": "7097232",
            "eth.addr.oui_resolved": "LiteON",
            "eth.dst.lg": "0",
            "eth.lg": "0",
            "eth.dst.ig": "0",
            "eth.ig": "0"
          },
          "eth.src": "1c:69:7a:5b:98:8a",
          "eth.src_tree": {
            "eth.src_resolved": "EliteGro_5b:98:8a",
            "eth.src.oui": "1862010",
            "eth.src.oui_resolved": "EliteGroup Computer Systems Co., LTD",
            "eth.addr": "1c:69:7a:5b:98:8a",
            "eth.addr_resolved": "EliteGro_5b:98:8a",
            "eth.addr.oui": "1862010",
            "eth.addr.oui_resolved": "EliteGroup Computer Systems Co., LTD",
            "eth.src.lg": "0",
            "eth.lg": "0",
            "eth.src.ig": "0",
            "eth.ig": "0"
          },
          "eth.type": "0x0800"
        },
        "ip": {
          "ip.version": "4",
          "ip.hdr_len": "20",
          "ip.dsfield": "0x00",
          "ip.dsfield_tree": {
            "ip.dsfield.dscp": "0",
            "ip.dsfield.ecn": "0"
          },
          "ip.len": "52",
          "ip.id": "0x2b79",
          "ip.flags": "0x40",
          "ip.flags_tree": {
            "ip.flags.rb": "0",
            "ip.flags.df": "1",
            "ip.flags.mf": "0"
          },
          "ip.frag_offset": "0",
          "ip.ttl": "64",
          "ip.proto": "6",
          "ip.checksum": "0x15db",
          "ip.checksum.status": "2",
          "ip.src": "10.95.114.49",
          "ip.addr": "10.95.114.49",
          "ip.src_host": "10.95.114.49",
          "ip.host": "10.95.114.49",
          "ip.dst": "10.95.114.129",
          "ip.addr": "10.95.114.129",
          "ip.dst_host": "10.95.114.129",
          "ip.host": "10.95.114.129"
        },
        "tcp": {
          "tcp.srcport": "60958",
          "tcp.dstport": "9000",
          "tcp.port": "60958",
          "tcp.port": "9000",
          "tcp.stream": "41",
          "tcp.completeness": "31",
          "tcp.len": "0",
          "tcp.seq": "0",
          "tcp.seq_raw": "1096348667",
          "tcp.nxtseq": "1",
          "tcp.ack": "0",
          "tcp.ack_raw": "0",
          "tcp.hdr_len": "32",
          "tcp.flags": "0x0002",
          "tcp.flags_tree": {
            "tcp.flags.res": "0",
            "tcp.flags.ns": "0",
            "tcp.flags.cwr": "0",
            "tcp.flags.ecn": "0",
            "tcp.flags.urg": "0",
            "tcp.flags.ack": "0",
            "tcp.flags.push": "0",
            "tcp.flags.reset": "0",
            "tcp.flags.syn": "1",
            "tcp.flags.syn_tree": {
              "_ws.expert": {
                "tcp.connection.syn": "",
                "_ws.expert.message": "Connection establish request (SYN): server port 9000",
                "_ws.expert.severity": "2097152",
                "_ws.expert.group": "33554432"
              }
            },
            "tcp.flags.fin": "0",
            "tcp.flags.str": "··········S·"
          },
          "tcp.window_size_value": "64240",
          "tcp.window_size": "64240",
          "tcp.checksum": "0x3414",
          "tcp.checksum.status": "2",
          "tcp.urgent_pointer": "0",
          "tcp.options": "02:04:05:b4:01:03:03:08:01:01:04:02",
          "tcp.options_tree": {
            "tcp.options.mss": "02:04:05:b4",
            "tcp.options.mss_tree": {
              "tcp.option_kind": "2",
              "tcp.option_len": "4",
              "tcp.options.mss_val": "1460"
            },
            "tcp.options.nop": "01",
            "tcp.options.nop_tree": {
              "tcp.option_kind": "1"
            },
            "tcp.options.wscale": "03:03:08",
            "tcp.options.wscale_tree": {
              "tcp.option_kind": "3",
              "tcp.option_len": "3",
              "tcp.options.wscale.shift": "8",
              "tcp.options.wscale.multiplier": "256"
            },
            "tcp.options.nop": "01",
            "tcp.options.nop_tree": {
              "tcp.option_kind": "1"
            },
            "tcp.options.nop": "01",
            "tcp.options.nop_tree": {
              "tcp.option_kind": "1"
            },
            "tcp.options.sack_perm": "04:02",
            "tcp.options.sack_perm_tree": {
              "tcp.option_kind": "4",
              "tcp.option_len": "2"
            }
          },
          "Timestamps": {
            "tcp.time_relative": "0.000000000",
            "tcp.time_delta": "0.000000000"
          }
        }
      }
    }
  },
  {
    "_index": "packets-2021-12-13",
    "_type": "doc",
    "_score": null,
    "_source": {
      "layers": {
        "frame": {
          "frame.interface_id": "0",
          "frame.interface_id_tree": {
            "frame.interface_name": "\\Device\\NPF_{A286F08E-8003-48D6-A82A-7BE6C6F0DEFF}",
            "frame.interface_description": "以太网"
          },
          "frame.encap_type": "1",
          "frame.time": "Dec 13, 2021 11:31:35.486761000 中国标准时间",
          "frame.offset_shift": "0.000000000",
          "frame.time_epoch": "1639366295.486761000",
          "frame.time_delta": "0.000649000",
          "frame.time_delta_displayed": "0.000649000",
          "frame.time_relative": "34.220784000",
          "frame.number": "2789",
          "frame.len": "66",
          "frame.cap_len": "66",
          "frame.marked": "0",
          "frame.ignored": "0",
          "frame.protocols": "eth:ethertype:ip:tcp",
          "frame.coloring_rule.name": "TCP SYN/FIN",
          "frame.coloring_rule.string": "tcp.flags & 0x02 || tcp.flags.fin == 1"
        },
        "eth": {
          "eth.dst": "1c:69:7a:5b:98:8a",
          "eth.dst_tree": {
            "eth.dst_resolved": "EliteGro_5b:98:8a",
            "eth.dst.oui": "1862010",
            "eth.dst.oui_resolved": "EliteGroup Computer Systems Co., LTD",
            "eth.addr": "1c:69:7a:5b:98:8a",
            "eth.addr_resolved": "EliteGro_5b:98:8a",
            "eth.addr.oui": "1862010",
            "eth.addr.oui_resolved": "EliteGroup Computer Systems Co., LTD",
            "eth.dst.lg": "0",
            "eth.lg": "0",
            "eth.dst.ig": "0",
            "eth.ig": "0"
          },
          "eth.src": "6c:4b:90:44:ef:cf",
          "eth.src_tree": {
            "eth.src_resolved": "LiteON_44:ef:cf",
            "eth.src.oui": "7097232",
            "eth.src.oui_resolved": "LiteON",
            "eth.addr": "6c:4b:90:44:ef:cf",
            "eth.addr_resolved": "LiteON_44:ef:cf",
            "eth.addr.oui": "7097232",
            "eth.addr.oui_resolved": "LiteON",
            "eth.src.lg": "0",
            "eth.lg": "0",
            "eth.src.ig": "0",
            "eth.ig": "0"
          },
          "eth.type": "0x0800"
        },
        "ip": {
          "ip.version": "4",
          "ip.hdr_len": "20",
          "ip.dsfield": "0x00",
          "ip.dsfield_tree": {
            "ip.dsfield.dscp": "0",
            "ip.dsfield.ecn": "0"
          },
          "ip.len": "52",
          "ip.id": "0x7439",
          "ip.flags": "0x40",
          "ip.flags_tree": {
            "ip.flags.rb": "0",
            "ip.flags.df": "1",
            "ip.flags.mf": "0"
          },
          "ip.frag_offset": "0",
          "ip.ttl": "128",
          "ip.proto": "6",
          "ip.checksum": "0x8d1a",
          "ip.checksum.status": "2",
          "ip.src": "10.95.114.129",
          "ip.addr": "10.95.114.129",
          "ip.src_host": "10.95.114.129",
          "ip.host": "10.95.114.129",
          "ip.dst": "10.95.114.49",
          "ip.addr": "10.95.114.49",
          "ip.dst_host": "10.95.114.49",
          "ip.host": "10.95.114.49"
        },
        "tcp": {
          "tcp.srcport": "9000",
          "tcp.dstport": "60958",
          "tcp.port": "9000",
          "tcp.port": "60958",
          "tcp.stream": "41",
          "tcp.completeness": "31",
          "tcp.len": "0",
          "tcp.seq": "0",
          "tcp.seq_raw": "2470467773",
          "tcp.nxtseq": "1",
          "tcp.ack": "1",
          "tcp.ack_raw": "1096348668",
          "tcp.hdr_len": "32",
          "tcp.flags": "0x0012",
          "tcp.flags_tree": {
            "tcp.flags.res": "0",
            "tcp.flags.ns": "0",
            "tcp.flags.cwr": "0",
            "tcp.flags.ecn": "0",
            "tcp.flags.urg": "0",
            "tcp.flags.ack": "1",
            "tcp.flags.push": "0",
            "tcp.flags.reset": "0",
            "tcp.flags.syn": "1",
            "tcp.flags.syn_tree": {
              "_ws.expert": {
                "tcp.connection.synack": "",
                "_ws.expert.message": "Connection establish acknowledge (SYN+ACK): server port 9000",
                "_ws.expert.severity": "2097152",
                "_ws.expert.group": "33554432"
              }
            },
            "tcp.flags.fin": "0",
            "tcp.flags.str": "·······A··S·"
          },
          "tcp.window_size_value": "65535",
          "tcp.window_size": "65535",
          "tcp.checksum": "0x42f6",
          "tcp.checksum.status": "2",
          "tcp.urgent_pointer": "0",
          "tcp.options": "02:04:05:b4:01:03:03:08:01:01:04:02",
          "tcp.options_tree": {
            "tcp.options.mss": "02:04:05:b4",
            "tcp.options.mss_tree": {
              "tcp.option_kind": "2",
              "tcp.option_len": "4",
              "tcp.options.mss_val": "1460"
            },
            "tcp.options.nop": "01",
            "tcp.options.nop_tree": {
              "tcp.option_kind": "1"
            },
            "tcp.options.wscale": "03:03:08",
            "tcp.options.wscale_tree": {
              "tcp.option_kind": "3",
              "tcp.option_len": "3",
              "tcp.options.wscale.shift": "8",
              "tcp.options.wscale.multiplier": "256"
            },
            "tcp.options.nop": "01",
            "tcp.options.nop_tree": {
              "tcp.option_kind": "1"
            },
            "tcp.options.nop": "01",
            "tcp.options.nop_tree": {
              "tcp.option_kind": "1"
            },
            "tcp.options.sack_perm": "04:02",
            "tcp.options.sack_perm_tree": {
              "tcp.option_kind": "4",
              "tcp.option_len": "2"
            }
          },
          "Timestamps": {
            "tcp.time_relative": "0.000649000",
            "tcp.time_delta": "0.000649000"
          },
          "tcp.analysis": {
            "tcp.analysis.acks_frame": "2788",
            "tcp.analysis.ack_rtt": "0.000649000",
            "tcp.analysis.initial_rtt": "0.000698000"
          }
        }
      }
    }
  },
  {
    "_index": "packets-2021-12-13",
    "_type": "doc",
    "_score": null,
    "_source": {
      "layers": {
        "frame": {
          "frame.interface_id": "0",
          "frame.interface_id_tree": {
            "frame.interface_name": "\\Device\\NPF_{A286F08E-8003-48D6-A82A-7BE6C6F0DEFF}",
            "frame.interface_description": "以太网"
          },
          "frame.encap_type": "1",
          "frame.time": "Dec 13, 2021 11:31:35.486810000 中国标准时间",
          "frame.offset_shift": "0.000000000",
          "frame.time_epoch": "1639366295.486810000",
          "frame.time_delta": "0.000049000",
          "frame.time_delta_displayed": "0.000049000",
          "frame.time_relative": "34.220833000",
          "frame.number": "2790",
          "frame.len": "54",
          "frame.cap_len": "54",
          "frame.marked": "0",
          "frame.ignored": "0",
          "frame.protocols": "eth:ethertype:ip:tcp",
          "frame.coloring_rule.name": "TCP",
          "frame.coloring_rule.string": "tcp"
        },
        "eth": {
          "eth.dst": "6c:4b:90:44:ef:cf",
          "eth.dst_tree": {
            "eth.dst_resolved": "LiteON_44:ef:cf",
            "eth.dst.oui": "7097232",
            "eth.dst.oui_resolved": "LiteON",
            "eth.addr": "6c:4b:90:44:ef:cf",
            "eth.addr_resolved": "LiteON_44:ef:cf",
            "eth.addr.oui": "7097232",
            "eth.addr.oui_resolved": "LiteON",
            "eth.dst.lg": "0",
            "eth.lg": "0",
            "eth.dst.ig": "0",
            "eth.ig": "0"
          },
          "eth.src": "1c:69:7a:5b:98:8a",
          "eth.src_tree": {
            "eth.src_resolved": "EliteGro_5b:98:8a",
            "eth.src.oui": "1862010",
            "eth.src.oui_resolved": "EliteGroup Computer Systems Co., LTD",
            "eth.addr": "1c:69:7a:5b:98:8a",
            "eth.addr_resolved": "EliteGro_5b:98:8a",
            "eth.addr.oui": "1862010",
            "eth.addr.oui_resolved": "EliteGroup Computer Systems Co., LTD",
            "eth.src.lg": "0",
            "eth.lg": "0",
            "eth.src.ig": "0",
            "eth.ig": "0"
          },
          "eth.type": "0x0800"
        },
        "ip": {
          "ip.version": "4",
          "ip.hdr_len": "20",
          "ip.dsfield": "0x00",
          "ip.dsfield_tree": {
            "ip.dsfield.dscp": "0",
            "ip.dsfield.ecn": "0"
          },
          "ip.len": "40",
          "ip.id": "0x2b7a",
          "ip.flags": "0x40",
          "ip.flags_tree": {
            "ip.flags.rb": "0",
            "ip.flags.df": "1",
            "ip.flags.mf": "0"
          },
          "ip.frag_offset": "0",
          "ip.ttl": "64",
          "ip.proto": "6",
          "ip.checksum": "0x15e6",
          "ip.checksum.status": "2",
          "ip.src": "10.95.114.49",
          "ip.addr": "10.95.114.49",
          "ip.src_host": "10.95.114.49",
          "ip.host": "10.95.114.49",
          "ip.dst": "10.95.114.129",
          "ip.addr": "10.95.114.129",
          "ip.dst_host": "10.95.114.129",
          "ip.host": "10.95.114.129"
        },
        "tcp": {
          "tcp.srcport": "60958",
          "tcp.dstport": "9000",
          "tcp.port": "60958",
          "tcp.port": "9000",
          "tcp.stream": "41",
          "tcp.completeness": "31",
          "tcp.len": "0",
          "tcp.seq": "1",
          "tcp.seq_raw": "1096348668",
          "tcp.nxtseq": "1",
          "tcp.ack": "1",
          "tcp.ack_raw": "2470467774",
          "tcp.hdr_len": "20",
          "tcp.flags": "0x0010",
          "tcp.flags_tree": {
            "tcp.flags.res": "0",
            "tcp.flags.ns": "0",
            "tcp.flags.cwr": "0",
            "tcp.flags.ecn": "0",
            "tcp.flags.urg": "0",
            "tcp.flags.ack": "1",
            "tcp.flags.push": "0",
            "tcp.flags.reset": "0",
            "tcp.flags.syn": "0",
            "tcp.flags.fin": "0",
            "tcp.flags.str": "·······A····"
          },
          "tcp.window_size_value": "8212",
          "tcp.window_size": "2102272",
          "tcp.window_size_scalefactor": "256",
          "tcp.checksum": "0x63b5",
          "tcp.checksum.status": "2",
          "tcp.urgent_pointer": "0",
          "Timestamps": {
            "tcp.time_relative": "0.000698000",
            "tcp.time_delta": "0.000049000"
          },
          "tcp.analysis": {
            "tcp.analysis.acks_frame": "2789",
            "tcp.analysis.ack_rtt": "0.000049000",
            "tcp.analysis.initial_rtt": "0.000698000"
          }
        }
      }
    }
  },
  {
    "_index": "packets-2021-12-13",
    "_type": "doc",
    "_score": null,
    "_source": {
      "layers": {
        "frame": {
          "frame.interface_id": "0",
          "frame.interface_id_tree": {
            "frame.interface_name": "\\Device\\NPF_{A286F08E-8003-48D6-A82A-7BE6C6F0DEFF}",
            "frame.interface_description": "以太网"
          },
          "frame.encap_type": "1",
          "frame.time": "Dec 13, 2021 11:31:55.218112000 中国标准时间",
          "frame.offset_shift": "0.000000000",
          "frame.time_epoch": "1639366315.218112000",
          "frame.time_delta": "0.000084000",
          "frame.time_delta_displayed": "19.731302000",
          "frame.time_relative": "53.952135000",
          "frame.number": "4137",
          "frame.len": "62",
          "frame.cap_len": "62",
          "frame.marked": "0",
          "frame.ignored": "0",
          "frame.protocols": "eth:ethertype:ip:tcp:data",
          "frame.coloring_rule.name": "TCP",
          "frame.coloring_rule.string": "tcp"
        },
        "eth": {
          "eth.dst": "6c:4b:90:44:ef:cf",
          "eth.dst_tree": {
            "eth.dst_resolved": "LiteON_44:ef:cf",
            "eth.dst.oui": "7097232",
            "eth.dst.oui_resolved": "LiteON",
            "eth.addr": "6c:4b:90:44:ef:cf",
            "eth.addr_resolved": "LiteON_44:ef:cf",
            "eth.addr.oui": "7097232",
            "eth.addr.oui_resolved": "LiteON",
            "eth.dst.lg": "0",
            "eth.lg": "0",
            "eth.dst.ig": "0",
            "eth.ig": "0"
          },
          "eth.src": "1c:69:7a:5b:98:8a",
          "eth.src_tree": {
            "eth.src_resolved": "EliteGro_5b:98:8a",
            "eth.src.oui": "1862010",
            "eth.src.oui_resolved": "EliteGroup Computer Systems Co., LTD",
            "eth.addr": "1c:69:7a:5b:98:8a",
            "eth.addr_resolved": "EliteGro_5b:98:8a",
            "eth.addr.oui": "1862010",
            "eth.addr.oui_resolved": "EliteGroup Computer Systems Co., LTD",
            "eth.src.lg": "0",
            "eth.lg": "0",
            "eth.src.ig": "0",
            "eth.ig": "0"
          },
          "eth.type": "0x0800"
        },
        "ip": {
          "ip.version": "4",
          "ip.hdr_len": "20",
          "ip.dsfield": "0x00",
          "ip.dsfield_tree": {
            "ip.dsfield.dscp": "0",
            "ip.dsfield.ecn": "0"
          },
          "ip.len": "48",
          "ip.id": "0x2b7b",
          "ip.flags": "0x40",
          "ip.flags_tree": {
            "ip.flags.rb": "0",
            "ip.flags.df": "1",
            "ip.flags.mf": "0"
          },
          "ip.frag_offset": "0",
          "ip.ttl": "64",
          "ip.proto": "6",
          "ip.checksum": "0x15dd",
          "ip.checksum.status": "2",
          "ip.src": "10.95.114.49",
          "ip.addr": "10.95.114.49",
          "ip.src_host": "10.95.114.49",
          "ip.host": "10.95.114.49",
          "ip.dst": "10.95.114.129",
          "ip.addr": "10.95.114.129",
          "ip.dst_host": "10.95.114.129",
          "ip.host": "10.95.114.129"
        },
        "tcp": {
          "tcp.srcport": "60958",
          "tcp.dstport": "9000",
          "tcp.port": "60958",
          "tcp.port": "9000",
          "tcp.stream": "41",
          "tcp.completeness": "31",
          "tcp.len": "8",
          "tcp.seq": "1",
          "tcp.seq_raw": "1096348668",
          "tcp.nxtseq": "9",
          "tcp.ack": "1",
          "tcp.ack_raw": "2470467774",
          "tcp.hdr_len": "20",
          "tcp.flags": "0x0018",
          "tcp.flags_tree": {
            "tcp.flags.res": "0",
            "tcp.flags.ns": "0",
            "tcp.flags.cwr": "0",
            "tcp.flags.ecn": "0",
            "tcp.flags.urg": "0",
            "tcp.flags.ack": "1",
            "tcp.flags.push": "1",
            "tcp.flags.reset": "0",
            "tcp.flags.syn": "0",
            "tcp.flags.fin": "0",
            "tcp.flags.str": "·······AP···"
          },
          "tcp.window_size_value": "8212",
          "tcp.window_size": "2102272",
          "tcp.window_size_scalefactor": "256",
          "tcp.checksum": "0xfc2e",
          "tcp.checksum.status": "2",
          "tcp.urgent_pointer": "0",
          "Timestamps": {
            "tcp.time_relative": "19.732000000",
            "tcp.time_delta": "19.731302000"
          },
          "tcp.analysis": {
            "tcp.analysis.initial_rtt": "0.000698000",
            "tcp.analysis.bytes_in_flight": "8",
            "tcp.analysis.push_bytes_sent": "8"
          },
          "tcp.payload": "48:65:6c:6c:6f:54:43:50"
        },
        "data": {
          "data.data": "48:65:6c:6c:6f:54:43:50",
          "data.len": "8"
        }
      }
    }
  },
  {
    "_index": "packets-2021-12-13",
    "_type": "doc",
    "_score": null,
    "_source": {
      "layers": {
        "frame": {
          "frame.interface_id": "0",
          "frame.interface_id_tree": {
            "frame.interface_name": "\\Device\\NPF_{A286F08E-8003-48D6-A82A-7BE6C6F0DEFF}",
            "frame.interface_description": "以太网"
          },
          "frame.encap_type": "1",
          "frame.time": "Dec 13, 2021 11:31:55.259587000 中国标准时间",
          "frame.offset_shift": "0.000000000",
          "frame.time_epoch": "1639366315.259587000",
          "frame.time_delta": "0.041475000",
          "frame.time_delta_displayed": "0.041475000",
          "frame.time_relative": "53.993610000",
          "frame.number": "4138",
          "frame.len": "60",
          "frame.cap_len": "60",
          "frame.marked": "0",
          "frame.ignored": "0",
          "frame.protocols": "eth:ethertype:ip:tcp",
          "frame.coloring_rule.name": "TCP",
          "frame.coloring_rule.string": "tcp"
        },
        "eth": {
          "eth.dst": "1c:69:7a:5b:98:8a",
          "eth.dst_tree": {
            "eth.dst_resolved": "EliteGro_5b:98:8a",
            "eth.dst.oui": "1862010",
            "eth.dst.oui_resolved": "EliteGroup Computer Systems Co., LTD",
            "eth.addr": "1c:69:7a:5b:98:8a",
            "eth.addr_resolved": "EliteGro_5b:98:8a",
            "eth.addr.oui": "1862010",
            "eth.addr.oui_resolved": "EliteGroup Computer Systems Co., LTD",
            "eth.dst.lg": "0",
            "eth.lg": "0",
            "eth.dst.ig": "0",
            "eth.ig": "0"
          },
          "eth.src": "6c:4b:90:44:ef:cf",
          "eth.src_tree": {
            "eth.src_resolved": "LiteON_44:ef:cf",
            "eth.src.oui": "7097232",
            "eth.src.oui_resolved": "LiteON",
            "eth.addr": "6c:4b:90:44:ef:cf",
            "eth.addr_resolved": "LiteON_44:ef:cf",
            "eth.addr.oui": "7097232",
            "eth.addr.oui_resolved": "LiteON",
            "eth.src.lg": "0",
            "eth.lg": "0",
            "eth.src.ig": "0",
            "eth.ig": "0"
          },
          "eth.type": "0x0800",
          "eth.padding": "00:00:00:00:00:00"
        },
        "ip": {
          "ip.version": "4",
          "ip.hdr_len": "20",
          "ip.dsfield": "0x00",
          "ip.dsfield_tree": {
            "ip.dsfield.dscp": "0",
            "ip.dsfield.ecn": "0"
          },
          "ip.len": "40",
          "ip.id": "0x743a",
          "ip.flags": "0x40",
          "ip.flags_tree": {
            "ip.flags.rb": "0",
            "ip.flags.df": "1",
            "ip.flags.mf": "0"
          },
          "ip.frag_offset": "0",
          "ip.ttl": "128",
          "ip.proto": "6",
          "ip.checksum": "0x8d25",
          "ip.checksum.status": "2",
          "ip.src": "10.95.114.129",
          "ip.addr": "10.95.114.129",
          "ip.src_host": "10.95.114.129",
          "ip.host": "10.95.114.129",
          "ip.dst": "10.95.114.49",
          "ip.addr": "10.95.114.49",
          "ip.dst_host": "10.95.114.49",
          "ip.host": "10.95.114.49"
        },
        "tcp": {
          "tcp.srcport": "9000",
          "tcp.dstport": "60958",
          "tcp.port": "9000",
          "tcp.port": "60958",
          "tcp.stream": "41",
          "tcp.completeness": "31",
          "tcp.len": "0",
          "tcp.seq": "1",
          "tcp.seq_raw": "2470467774",
          "tcp.nxtseq": "1",
          "tcp.ack": "9",
          "tcp.ack_raw": "1096348676",
          "tcp.hdr_len": "20",
          "tcp.flags": "0x0010",
          "tcp.flags_tree": {
            "tcp.flags.res": "0",
            "tcp.flags.ns": "0",
            "tcp.flags.cwr": "0",
            "tcp.flags.ecn": "0",
            "tcp.flags.urg": "0",
            "tcp.flags.ack": "1",
            "tcp.flags.push": "0",
            "tcp.flags.reset": "0",
            "tcp.flags.syn": "0",
            "tcp.flags.fin": "0",
            "tcp.flags.str": "·······A····"
          },
          "tcp.window_size_value": "8212",
          "tcp.window_size": "2102272",
          "tcp.window_size_scalefactor": "256",
          "tcp.checksum": "0x63ad",
          "tcp.checksum.status": "2",
          "tcp.urgent_pointer": "0",
          "Timestamps": {
            "tcp.time_relative": "19.773475000",
            "tcp.time_delta": "0.041475000"
          },
          "tcp.analysis": {
            "tcp.analysis.acks_frame": "4137",
            "tcp.analysis.ack_rtt": "0.041475000",
            "tcp.analysis.initial_rtt": "0.000698000"
          }
        }
      }
    }
  },
  {
    "_index": "packets-2021-12-13",
    "_type": "doc",
    "_score": null,
    "_source": {
      "layers": {
        "frame": {
          "frame.interface_id": "0",
          "frame.interface_id_tree": {
            "frame.interface_name": "\\Device\\NPF_{A286F08E-8003-48D6-A82A-7BE6C6F0DEFF}",
            "frame.interface_description": "以太网"
          },
          "frame.encap_type": "1",
          "frame.time": "Dec 13, 2021 11:31:59.936046000 中国标准时间",
          "frame.offset_shift": "0.000000000",
          "frame.time_epoch": "1639366319.936046000",
          "frame.time_delta": "0.006776000",
          "frame.time_delta_displayed": "4.676459000",
          "frame.time_relative": "58.670069000",
          "frame.number": "4654",
          "frame.len": "54",
          "frame.cap_len": "54",
          "frame.marked": "0",
          "frame.ignored": "0",
          "frame.protocols": "eth:ethertype:ip:tcp",
          "frame.coloring_rule.name": "TCP SYN/FIN",
          "frame.coloring_rule.string": "tcp.flags & 0x02 || tcp.flags.fin == 1"
        },
        "eth": {
          "eth.dst": "6c:4b:90:44:ef:cf",
          "eth.dst_tree": {
            "eth.dst_resolved": "LiteON_44:ef:cf",
            "eth.dst.oui": "7097232",
            "eth.dst.oui_resolved": "LiteON",
            "eth.addr": "6c:4b:90:44:ef:cf",
            "eth.addr_resolved": "LiteON_44:ef:cf",
            "eth.addr.oui": "7097232",
            "eth.addr.oui_resolved": "LiteON",
            "eth.dst.lg": "0",
            "eth.lg": "0",
            "eth.dst.ig": "0",
            "eth.ig": "0"
          },
          "eth.src": "1c:69:7a:5b:98:8a",
          "eth.src_tree": {
            "eth.src_resolved": "EliteGro_5b:98:8a",
            "eth.src.oui": "1862010",
            "eth.src.oui_resolved": "EliteGroup Computer Systems Co., LTD",
            "eth.addr": "1c:69:7a:5b:98:8a",
            "eth.addr_resolved": "EliteGro_5b:98:8a",
            "eth.addr.oui": "1862010",
            "eth.addr.oui_resolved": "EliteGroup Computer Systems Co., LTD",
            "eth.src.lg": "0",
            "eth.lg": "0",
            "eth.src.ig": "0",
            "eth.ig": "0"
          },
          "eth.type": "0x0800"
        },
        "ip": {
          "ip.version": "4",
          "ip.hdr_len": "20",
          "ip.dsfield": "0x00",
          "ip.dsfield_tree": {
            "ip.dsfield.dscp": "0",
            "ip.dsfield.ecn": "0"
          },
          "ip.len": "40",
          "ip.id": "0x2b7c",
          "ip.flags": "0x40",
          "ip.flags_tree": {
            "ip.flags.rb": "0",
            "ip.flags.df": "1",
            "ip.flags.mf": "0"
          },
          "ip.frag_offset": "0",
          "ip.ttl": "64",
          "ip.proto": "6",
          "ip.checksum": "0x15e4",
          "ip.checksum.status": "2",
          "ip.src": "10.95.114.49",
          "ip.addr": "10.95.114.49",
          "ip.src_host": "10.95.114.49",
          "ip.host": "10.95.114.49",
          "ip.dst": "10.95.114.129",
          "ip.addr": "10.95.114.129",
          "ip.dst_host": "10.95.114.129",
          "ip.host": "10.95.114.129"
        },
        "tcp": {
          "tcp.srcport": "60958",
          "tcp.dstport": "9000",
          "tcp.port": "60958",
          "tcp.port": "9000",
          "tcp.stream": "41",
          "tcp.completeness": "31",
          "tcp.len": "0",
          "tcp.seq": "9",
          "tcp.seq_raw": "1096348676",
          "tcp.nxtseq": "10",
          "tcp.ack": "1",
          "tcp.ack_raw": "2470467774",
          "tcp.hdr_len": "20",
          "tcp.flags": "0x0011",
          "tcp.flags_tree": {
            "tcp.flags.res": "0",
            "tcp.flags.ns": "0",
            "tcp.flags.cwr": "0",
            "tcp.flags.ecn": "0",
            "tcp.flags.urg": "0",
            "tcp.flags.ack": "1",
            "tcp.flags.push": "0",
            "tcp.flags.reset": "0",
            "tcp.flags.syn": "0",
            "tcp.flags.fin": "1",
            "tcp.flags.fin_tree": {
              "_ws.expert": {
                "tcp.connection.fin": "",
                "_ws.expert.message": "Connection finish (FIN)",
                "_ws.expert.severity": "2097152",
                "_ws.expert.group": "33554432"
              }
            },
            "tcp.flags.str": "·······A···F",
            "tcp.flags.str_tree": {
              "_ws.expert": {
                "tcp.connection.fin_active": "",
                "_ws.expert.message": "This frame initiates the connection closing",
                "_ws.expert.severity": "4194304",
                "_ws.expert.group": "33554432"
              }
            }
          },
          "tcp.window_size_value": "8212",
          "tcp.window_size": "2102272",
          "tcp.window_size_scalefactor": "256",
          "tcp.checksum": "0x63ac",
          "tcp.checksum.status": "2",
          "tcp.urgent_pointer": "0",
          "Timestamps": {
            "tcp.time_relative": "24.449934000",
            "tcp.time_delta": "4.676459000"
          }
        }
      }
    }
  },
  {
    "_index": "packets-2021-12-13",
    "_type": "doc",
    "_score": null,
    "_source": {
      "layers": {
        "frame": {
          "frame.interface_id": "0",
          "frame.interface_id_tree": {
            "frame.interface_name": "\\Device\\NPF_{A286F08E-8003-48D6-A82A-7BE6C6F0DEFF}",
            "frame.interface_description": "以太网"
          },
          "frame.encap_type": "1",
          "frame.time": "Dec 13, 2021 11:31:59.936345000 中国标准时间",
          "frame.offset_shift": "0.000000000",
          "frame.time_epoch": "1639366319.936345000",
          "frame.time_delta": "0.000299000",
          "frame.time_delta_displayed": "0.000299000",
          "frame.time_relative": "58.670368000",
          "frame.number": "4655",
          "frame.len": "60",
          "frame.cap_len": "60",
          "frame.marked": "0",
          "frame.ignored": "0",
          "frame.protocols": "eth:ethertype:ip:tcp",
          "frame.coloring_rule.name": "TCP",
          "frame.coloring_rule.string": "tcp"
        },
        "eth": {
          "eth.dst": "1c:69:7a:5b:98:8a",
          "eth.dst_tree": {
            "eth.dst_resolved": "EliteGro_5b:98:8a",
            "eth.dst.oui": "1862010",
            "eth.dst.oui_resolved": "EliteGroup Computer Systems Co., LTD",
            "eth.addr": "1c:69:7a:5b:98:8a",
            "eth.addr_resolved": "EliteGro_5b:98:8a",
            "eth.addr.oui": "1862010",
            "eth.addr.oui_resolved": "EliteGroup Computer Systems Co., LTD",
            "eth.dst.lg": "0",
            "eth.lg": "0",
            "eth.dst.ig": "0",
            "eth.ig": "0"
          },
          "eth.src": "6c:4b:90:44:ef:cf",
          "eth.src_tree": {
            "eth.src_resolved": "LiteON_44:ef:cf",
            "eth.src.oui": "7097232",
            "eth.src.oui_resolved": "LiteON",
            "eth.addr": "6c:4b:90:44:ef:cf",
            "eth.addr_resolved": "LiteON_44:ef:cf",
            "eth.addr.oui": "7097232",
            "eth.addr.oui_resolved": "LiteON",
            "eth.src.lg": "0",
            "eth.lg": "0",
            "eth.src.ig": "0",
            "eth.ig": "0"
          },
          "eth.type": "0x0800",
          "eth.padding": "00:00:00:00:00:00"
        },
        "ip": {
          "ip.version": "4",
          "ip.hdr_len": "20",
          "ip.dsfield": "0x00",
          "ip.dsfield_tree": {
            "ip.dsfield.dscp": "0",
            "ip.dsfield.ecn": "0"
          },
          "ip.len": "40",
          "ip.id": "0x743b",
          "ip.flags": "0x40",
          "ip.flags_tree": {
            "ip.flags.rb": "0",
            "ip.flags.df": "1",
            "ip.flags.mf": "0"
          },
          "ip.frag_offset": "0",
          "ip.ttl": "128",
          "ip.proto": "6",
          "ip.checksum": "0x8d24",
          "ip.checksum.status": "2",
          "ip.src": "10.95.114.129",
          "ip.addr": "10.95.114.129",
          "ip.src_host": "10.95.114.129",
          "ip.host": "10.95.114.129",
          "ip.dst": "10.95.114.49",
          "ip.addr": "10.95.114.49",
          "ip.dst_host": "10.95.114.49",
          "ip.host": "10.95.114.49"
        },
        "tcp": {
          "tcp.srcport": "9000",
          "tcp.dstport": "60958",
          "tcp.port": "9000",
          "tcp.port": "60958",
          "tcp.stream": "41",
          "tcp.completeness": "31",
          "tcp.len": "0",
          "tcp.seq": "1",
          "tcp.seq_raw": "2470467774",
          "tcp.nxtseq": "1",
          "tcp.ack": "10",
          "tcp.ack_raw": "1096348677",
          "tcp.hdr_len": "20",
          "tcp.flags": "0x0010",
          "tcp.flags_tree": {
            "tcp.flags.res": "0",
            "tcp.flags.ns": "0",
            "tcp.flags.cwr": "0",
            "tcp.flags.ecn": "0",
            "tcp.flags.urg": "0",
            "tcp.flags.ack": "1",
            "tcp.flags.push": "0",
            "tcp.flags.reset": "0",
            "tcp.flags.syn": "0",
            "tcp.flags.fin": "0",
            "tcp.flags.str": "·······A····"
          },
          "tcp.window_size_value": "8212",
          "tcp.window_size": "2102272",
          "tcp.window_size_scalefactor": "256",
          "tcp.checksum": "0x63ac",
          "tcp.checksum.status": "2",
          "tcp.urgent_pointer": "0",
          "Timestamps": {
            "tcp.time_relative": "24.450233000",
            "tcp.time_delta": "0.000299000"
          },
          "tcp.analysis": {
            "tcp.analysis.acks_frame": "4654",
            "tcp.analysis.ack_rtt": "0.000299000",
            "tcp.analysis.initial_rtt": "0.000698000"
          }
        }
      }
    }
  },
  {
    "_index": "packets-2021-12-13",
    "_type": "doc",
    "_score": null,
    "_source": {
      "layers": {
        "frame": {
          "frame.interface_id": "0",
          "frame.interface_id_tree": {
            "frame.interface_name": "\\Device\\NPF_{A286F08E-8003-48D6-A82A-7BE6C6F0DEFF}",
            "frame.interface_description": "以太网"
          },
          "frame.encap_type": "1",
          "frame.time": "Dec 13, 2021 11:31:59.936693000 中国标准时间",
          "frame.offset_shift": "0.000000000",
          "frame.time_epoch": "1639366319.936693000",
          "frame.time_delta": "0.000348000",
          "frame.time_delta_displayed": "0.000348000",
          "frame.time_relative": "58.670716000",
          "frame.number": "4656",
          "frame.len": "60",
          "frame.cap_len": "60",
          "frame.marked": "0",
          "frame.ignored": "0",
          "frame.protocols": "eth:ethertype:ip:tcp",
          "frame.coloring_rule.name": "TCP SYN/FIN",
          "frame.coloring_rule.string": "tcp.flags & 0x02 || tcp.flags.fin == 1"
        },
        "eth": {
          "eth.dst": "1c:69:7a:5b:98:8a",
          "eth.dst_tree": {
            "eth.dst_resolved": "EliteGro_5b:98:8a",
            "eth.dst.oui": "1862010",
            "eth.dst.oui_resolved": "EliteGroup Computer Systems Co., LTD",
            "eth.addr": "1c:69:7a:5b:98:8a",
            "eth.addr_resolved": "EliteGro_5b:98:8a",
            "eth.addr.oui": "1862010",
            "eth.addr.oui_resolved": "EliteGroup Computer Systems Co., LTD",
            "eth.dst.lg": "0",
            "eth.lg": "0",
            "eth.dst.ig": "0",
            "eth.ig": "0"
          },
          "eth.src": "6c:4b:90:44:ef:cf",
          "eth.src_tree": {
            "eth.src_resolved": "LiteON_44:ef:cf",
            "eth.src.oui": "7097232",
            "eth.src.oui_resolved": "LiteON",
            "eth.addr": "6c:4b:90:44:ef:cf",
            "eth.addr_resolved": "LiteON_44:ef:cf",
            "eth.addr.oui": "7097232",
            "eth.addr.oui_resolved": "LiteON",
            "eth.src.lg": "0",
            "eth.lg": "0",
            "eth.src.ig": "0",
            "eth.ig": "0"
          },
          "eth.type": "0x0800",
          "eth.padding": "00:00:00:00:00:00"
        },
        "ip": {
          "ip.version": "4",
          "ip.hdr_len": "20",
          "ip.dsfield": "0x00",
          "ip.dsfield_tree": {
            "ip.dsfield.dscp": "0",
            "ip.dsfield.ecn": "0"
          },
          "ip.len": "40",
          "ip.id": "0x743c",
          "ip.flags": "0x40",
          "ip.flags_tree": {
            "ip.flags.rb": "0",
            "ip.flags.df": "1",
            "ip.flags.mf": "0"
          },
          "ip.frag_offset": "0",
          "ip.ttl": "128",
          "ip.proto": "6",
          "ip.checksum": "0x8d23",
          "ip.checksum.status": "2",
          "ip.src": "10.95.114.129",
          "ip.addr": "10.95.114.129",
          "ip.src_host": "10.95.114.129",
          "ip.host": "10.95.114.129",
          "ip.dst": "10.95.114.49",
          "ip.addr": "10.95.114.49",
          "ip.dst_host": "10.95.114.49",
          "ip.host": "10.95.114.49"
        },
        "tcp": {
          "tcp.srcport": "9000",
          "tcp.dstport": "60958",
          "tcp.port": "9000",
          "tcp.port": "60958",
          "tcp.stream": "41",
          "tcp.completeness": "31",
          "tcp.len": "0",
          "tcp.seq": "1",
          "tcp.seq_raw": "2470467774",
          "tcp.nxtseq": "2",
          "tcp.ack": "10",
          "tcp.ack_raw": "1096348677",
          "tcp.hdr_len": "20",
          "tcp.flags": "0x0011",
          "tcp.flags_tree": {
            "tcp.flags.res": "0",
            "tcp.flags.ns": "0",
            "tcp.flags.cwr": "0",
            "tcp.flags.ecn": "0",
            "tcp.flags.urg": "0",
            "tcp.flags.ack": "1",
            "tcp.flags.push": "0",
            "tcp.flags.reset": "0",
            "tcp.flags.syn": "0",
            "tcp.flags.fin": "1",
            "tcp.flags.fin_tree": {
              "_ws.expert": {
                "tcp.connection.fin": "",
                "_ws.expert.message": "Connection finish (FIN)",
                "_ws.expert.severity": "2097152",
                "_ws.expert.group": "33554432"
              }
            },
            "tcp.flags.str": "·······A···F",
            "tcp.flags.str_tree": {
              "_ws.expert": {
                "tcp.connection.fin_passive": "",
                "_ws.expert.message": "This frame undergoes the connection closing",
                "_ws.expert.severity": "4194304",
                "_ws.expert.group": "33554432"
              }
            }
          },
          "tcp.window_size_value": "8212",
          "tcp.window_size": "2102272",
          "tcp.window_size_scalefactor": "256",
          "tcp.checksum": "0x63ab",
          "tcp.checksum.status": "2",
          "tcp.urgent_pointer": "0",
          "Timestamps": {
            "tcp.time_relative": "24.450581000",
            "tcp.time_delta": "0.000348000"
          }
        }
      }
    }
  },
  {
    "_index": "packets-2021-12-13",
    "_type": "doc",
    "_score": null,
    "_source": {
      "layers": {
        "frame": {
          "frame.interface_id": "0",
          "frame.interface_id_tree": {
            "frame.interface_name": "\\Device\\NPF_{A286F08E-8003-48D6-A82A-7BE6C6F0DEFF}",
            "frame.interface_description": "以太网"
          },
          "frame.encap_type": "1",
          "frame.time": "Dec 13, 2021 11:31:59.936710000 中国标准时间",
          "frame.offset_shift": "0.000000000",
          "frame.time_epoch": "1639366319.936710000",
          "frame.time_delta": "0.000017000",
          "frame.time_delta_displayed": "0.000017000",
          "frame.time_relative": "58.670733000",
          "frame.number": "4657",
          "frame.len": "54",
          "frame.cap_len": "54",
          "frame.marked": "0",
          "frame.ignored": "0",
          "frame.protocols": "eth:ethertype:ip:tcp",
          "frame.coloring_rule.name": "TCP",
          "frame.coloring_rule.string": "tcp"
        },
        "eth": {
          "eth.dst": "6c:4b:90:44:ef:cf",
          "eth.dst_tree": {
            "eth.dst_resolved": "LiteON_44:ef:cf",
            "eth.dst.oui": "7097232",
            "eth.dst.oui_resolved": "LiteON",
            "eth.addr": "6c:4b:90:44:ef:cf",
            "eth.addr_resolved": "LiteON_44:ef:cf",
            "eth.addr.oui": "7097232",
            "eth.addr.oui_resolved": "LiteON",
            "eth.dst.lg": "0",
            "eth.lg": "0",
            "eth.dst.ig": "0",
            "eth.ig": "0"
          },
          "eth.src": "1c:69:7a:5b:98:8a",
          "eth.src_tree": {
            "eth.src_resolved": "EliteGro_5b:98:8a",
            "eth.src.oui": "1862010",
            "eth.src.oui_resolved": "EliteGroup Computer Systems Co., LTD",
            "eth.addr": "1c:69:7a:5b:98:8a",
            "eth.addr_resolved": "EliteGro_5b:98:8a",
            "eth.addr.oui": "1862010",
            "eth.addr.oui_resolved": "EliteGroup Computer Systems Co., LTD",
            "eth.src.lg": "0",
            "eth.lg": "0",
            "eth.src.ig": "0",
            "eth.ig": "0"
          },
          "eth.type": "0x0800"
        },
        "ip": {
          "ip.version": "4",
          "ip.hdr_len": "20",
          "ip.dsfield": "0x00",
          "ip.dsfield_tree": {
            "ip.dsfield.dscp": "0",
            "ip.dsfield.ecn": "0"
          },
          "ip.len": "40",
          "ip.id": "0x2b7d",
          "ip.flags": "0x40",
          "ip.flags_tree": {
            "ip.flags.rb": "0",
            "ip.flags.df": "1",
            "ip.flags.mf": "0"
          },
          "ip.frag_offset": "0",
          "ip.ttl": "64",
          "ip.proto": "6",
          "ip.checksum": "0x15e3",
          "ip.checksum.status": "2",
          "ip.src": "10.95.114.49",
          "ip.addr": "10.95.114.49",
          "ip.src_host": "10.95.114.49",
          "ip.host": "10.95.114.49",
          "ip.dst": "10.95.114.129",
          "ip.addr": "10.95.114.129",
          "ip.dst_host": "10.95.114.129",
          "ip.host": "10.95.114.129"
        },
        "tcp": {
          "tcp.srcport": "60958",
          "tcp.dstport": "9000",
          "tcp.port": "60958",
          "tcp.port": "9000",
          "tcp.stream": "41",
          "tcp.completeness": "31",
          "tcp.len": "0",
          "tcp.seq": "10",
          "tcp.seq_raw": "1096348677",
          "tcp.nxtseq": "10",
          "tcp.ack": "2",
          "tcp.ack_raw": "2470467775",
          "tcp.hdr_len": "20",
          "tcp.flags": "0x0010",
          "tcp.flags_tree": {
            "tcp.flags.res": "0",
            "tcp.flags.ns": "0",
            "tcp.flags.cwr": "0",
            "tcp.flags.ecn": "0",
            "tcp.flags.urg": "0",
            "tcp.flags.ack": "1",
            "tcp.flags.push": "0",
            "tcp.flags.reset": "0",
            "tcp.flags.syn": "0",
            "tcp.flags.fin": "0",
            "tcp.flags.str": "·······A····"
          },
          "tcp.window_size_value": "8212",
          "tcp.window_size": "2102272",
          "tcp.window_size_scalefactor": "256",
          "tcp.checksum": "0x63ab",
          "tcp.checksum.status": "2",
          "tcp.urgent_pointer": "0",
          "Timestamps": {
            "tcp.time_relative": "24.450598000",
            "tcp.time_delta": "0.000017000"
          },
          "tcp.analysis": {
            "tcp.analysis.acks_frame": "4656",
            "tcp.analysis.ack_rtt": "0.000017000",
            "tcp.analysis.initial_rtt": "0.000698000"
          }
        }
      }
    }
  }
]
```



### 13.2.5 Timeout of Connection Establishment

### 13.2.6 Connection and Translators

## 13.3 TCP Options

| Kind | Length | Name           | Reference   | Description and Purpose                            |
| ---- | ------ | -------------- | ----------- | -------------------------------------------------- |
| 0    | 1      | EOL            | \[RFC0793\] | End of Option List                                 |
| 1    | 1      | NOP            | \[RFC0793\] | No Operation(used for padding)                     |
| 2    | 4      | MSS            | \[RFC0793\] | Maximum Segment Size                               |
| 3    | 3      | WSOPT          | \[RFC1323\] | Window scaling Factor(left-shift amount on window) |
| 4    | 2      | SACK-Permitted | \[RFC2018\] | Sender supports SACK options                       |
| 5    | Var.   | SACK           | \[RFC2018\] | SACK block(out-of-order data received)             |
| 8    | 10     | TSOPT          | [RFC1323]   | Timestamps option                                  |
| 28   | 4      | UTO            | \[RFC1323\] | User Timeout(abort after idle time)                |
| 29   | Var.   | TCP-AO         | \[RFC5925\] | Authentication option(using various algorithms)    |
| 253  | Var.   | Experimental   | \[RFC4727\] | Reserver for experimental use                      |
| 254  | Var.   | Experimental   | \[RFC4727\] | Reserver for experimental use                      |

Table 13-1 The TCP option values. Up to 40 bytes are available to hold options.

- The length is *total length* including kind and length.
- ***EOL*** Ending the Option. There are not process the option anymore.
- ***NOP*** Padding some option to multiple of 4 bytes(32 bits) because TCP header length field is using 4 bytes as units.

### 13.3.1 Maximum Segment Size (MSS) Option

***MSS*** Indicating the end largest receivable data.(Only TCP data don’t include TCP header)

- Default value: 536 

     > Any host are require to process IPv4 datagram at least as large as 576.
     >
     > 576 minus minimum-size IP and TCP header: 576-20-20=536

- Typical Value with IPv4: 1460 

     > 1500 bytes (The typical MTU size for Ethernet and path MTU for the Internet) minus IPv4 datagram which unusually is 40bytes: 1500-40=1460

- Typical Value with IPv6: 1440

     > 20 bytes less because of the larger IPv6 header

- Giant Value with IPv6 jumbograms: 65536

     > PMTU

### 13.3.2 Selective Acknowledgement(SACK) Options

*Holes*: The gap of the data queue in receiver.

Sender has learned about the holes:

1. Retransmission the data to fill the hole
2. SACK used to make receiver acknowledge the hole

Requirement: The receiver is SACK-capable by SACK-Permitted option to determine.

SACK block: a pair of 32-bit.(Start to end, so need 8 bytes)

SACK option: if have *n* SACK block, its length is 8n+2(2 bytes are used to hold the kind and length of the SACK option)



### 13.3.3 Window Scale (WSCALE or WSOPT) Option



### 13.3.4 Timestamps Option and Protection against Wrapped Sequence Numbers

*Timestamp* option(TSOPT or TSopt): two 4-bytes timestamp values in every segment.

- Monotonically increasing.

Approach:

- Enable the sender to calculate the estimate of the connection’s RTT for each ACK received.
- PAWS: Protect against wrapped sequence number



| Time | Bytes Sent | Send Seq. No. | Send Timestamp | Receive                                    |
| ---- | ---------- | ------------- | -------------- | ------------------------------------------ |
| A    | 0G:1G      | 0G:1G         | 1              | OK                                         |
| B    | 1G:2G      | 1G:2G         | 2              | OK, but one segment lost and retransmitted |
| C    | 2G:3G      | 2G:3G         | 3              | OK                                         |
| D    | 3G:4G      | 3G:4G         | 4              | OK                                         |
| E    | 4G:5G      | 0G:1G         | 5              | OK                                         |
| F    | 5G:6G      | 1G:2G         | 6              | OK, but retransmitted segment reappears    |

Table 13-2 The TCP Timestamps option can disambiguate segments with the same sequence numbers by providing an extra 32 bits of effective sequence number space.

Generally speaking, the segment will be discarded if TTL expired. One problem may be caused in the relatively higher-speed network is that one segment will delay to arrive  the end as one new packet be retransmitted.

In time B, one segment lost and retransmitted.

In time F, the lost segment come back.

PAWS algorithm: By verified the delayed segment’s timestamp(2) which is less than most recent timestamp(5, or 6), the reappeared segment will be discarded.



### 13.3.5 User Timeout (UTO) Option

**User Timeout Option** the maximum time that sender willing to wait for an ACK of outstanding data before concluding that the remote host has failed.

- UTO are advisory.

### 13.3.6 Authentication Option(TCP-AO)





























