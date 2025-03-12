/// <reference path="./wasi-sockets-network.d.ts" />
/// <reference path="./wasi-sockets-tcp.d.ts" />
declare module 'wasi:sockets/tcp-create-socket@0.2.3' {
  /**
   * Create a new TCP socket.
   * 
   * Similar to `socket(AF_INET or AF_INET6, SOCK_STREAM, IPPROTO_TCP)` in POSIX.
   * On IPv6 sockets, IPV6_V6ONLY is enabled by default and can't be configured otherwise.
   * 
   * This function does not require a network capability handle. This is considered to be safe because
   * at time of creation, the socket is not bound to any `network` yet. Up to the moment `bind`/`connect`
   * is called, the socket is effectively an in-memory configuration object, unable to communicate with the outside world.
   * 
   * All sockets are non-blocking. Use the wasi-poll interface to block on asynchronous operations.
   * 
   * # Typical errors
   * - `not-supported`:     The specified `address-family` is not supported. (EAFNOSUPPORT)
   * - `new-socket-limit`:  The new socket resource could not be created because of a system limit. (EMFILE, ENFILE)
   * 
   * # References
   * - <https://pubs.opengroup.org/onlinepubs/9699919799/functions/socket.html>
   * - <https://man7.org/linux/man-pages/man2/socket.2.html>
   * - <https://learn.microsoft.com/en-us/windows/win32/api/winsock2/nf-winsock2-wsasocketw>
   * - <https://man.freebsd.org/cgi/man.cgi?query=socket&sektion=2>
   */
  export function createTcpSocket(addressFamily: IpAddressFamily): TcpSocket;
  export type Network = import('wasi:sockets/network@0.2.3').Network;
  export type ErrorCode = import('wasi:sockets/network@0.2.3').ErrorCode;
  export type IpAddressFamily = import('wasi:sockets/network@0.2.3').IpAddressFamily;
  export type TcpSocket = import('wasi:sockets/tcp@0.2.3').TcpSocket;
}
