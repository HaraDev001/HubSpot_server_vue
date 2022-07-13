import request from '@/utils/request';

export function fetchMessages() {
  return request({
    url: '/messages',
    method: 'get',
  });
}

export function fetchMessagesByUserId(content) {
  return request({
    url: '/messages/admin',
    method: 'get',
    params: content,
  });
}

export function sendMessage(content) {
  return request({
    url: '/messages',
    method: 'post',
    params: content,
  });
}

export function getAllClients() {
  return request({
    url: '/users',
    method: 'get',
  });
}

export function sendMessageToUser(content) {
  return request({
    url: '/messages/admin',
    method: 'post',
    params: content,
  });
}

export function setToReadedMessage(content) {
  return request({
    url: '/messages/setReaded',
    method: 'post',
    params: content,
  });
}

export function getNumberOfUnreadedMessages(content) {
  return request({
    url: '/messages/unreadedNumber',
    method: 'get',
    params: content,
  });
}
