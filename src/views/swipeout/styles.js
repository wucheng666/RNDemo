import React from 'react';
import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500",
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22,
  },

    swipeout: {
        backgroundColor: '#dbddde',
        overflow: 'hidden',
    },
    swipeoutBtnTouchable: {
        flex: 1,
    },
    swipeoutBtn: {
        alignItems: 'center',
        backgroundColor: '#b6bec0',
        flex: 1,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    swipeoutBtnText: {
        color: '#fff',
        textAlign: 'center',
    },
    swipeoutBtns: {
        bottom: 0,
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        right: 0,
        top: 0,
    },
    swipeoutContent: {
    },
    colorDelete: {
        backgroundColor: '#fb3d38',
    },
    colorPrimary: {
        backgroundColor: '#006fff'
    },
    colorSecondary: {
        backgroundColor: '#fd9427'
    },
})

module.exports = styles
