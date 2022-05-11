import React, { useState, useEffect } from 'react';

import Icons from '../components/icons';
import Imgs from '../components/imgs';
import Context from '../components/context';
import AuthorAvatar from '../components/author-avatar';
import AuthorName from '../components/author-name'
import Button from '../components/buttons'
import HashLinck from '../components/hash-linck'

let localeFavs = window.localStorage.getItem('handleFavourites'),
  timer,
  reloadTime = 0;

function Messanger(props) {
  const [messages, setMessages] = useState([]);
  const [reload, setReload] = useState(false);
  const [lastMessId, setlastMessId] = useState(0);

  useEffect(() => {
    if (reload) {
      fetch('http://f0665380.xsph.ru/', {
        method: 'POST',
        mode: 'no-cors',
        referrerPolicy: 'no-referrer',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: new URLSearchParams({ actionName: 'MessagesLoad', messageId: lastMessId })
      })
        .then((response) => (response.json()))
        .then(data => {
          if (typeof data.Messages === 'object' && data.Messages.length !== messages.length) {
            data.Messages.map(item => setMessages(prevArray => [...prevArray, item]));

            if (data.Messages.length) {
              const lastId = (data.Messages.length === 0 ? 0 : data.Messages.length - 1);
              setlastMessId(parseInt(data.Messages[lastId].id));
            }
          }
        })
        .catch(error => console.log(error));
    }

    timer = setTimeout(() => {
      clearTimeout(timer)
      if (reloadTime === 0) reloadTime = 5000
      setReload(!reload);
    }, reloadTime);

  }, [reload]);

  function arrayShowMessanger() {
    let arr = messages.slice()

    if (props.reverse)
      return arr.reverse()
    else
      return arr
  }

  function handleFavourites(e) {
    e.preventDefault();
    e.stopPropagation();

    let selectFavs = parseInt(e.target.closest('.msg').id)

    if (localeFavs) {
      localeFavs = JSON.parse(localeFavs)
      let locfavs = localeFavs.filter(item => item === selectFavs)
      console.log(locfavs);
      if (!locfavs.length) {
        localeFavs.push(selectFavs)
        window.localStorage.setItem('handleFavourites', JSON.stringify(localeFavs))
      } else {
        window.localStorage.setItem('handleFavourites', JSON.stringify(localeFavs.filter(item => item !== selectFavs)))
      }
    } else {
      window.localStorage.setItem('handleFavourites', JSON.stringify([selectFavs]))
    }

  }

  function activeFavs(item) {
    if (localeFavs)
      return JSON.parse(localeFavs).filter(local => local === parseInt(item.id))[0]
    else
      return false
  }


  return (
    arrayShowMessanger().map((item, key) => {
      return (
        <div className="msg" key={key} id={item.id}>
          {/* <h1>№ {item.id}</h1> */}
          <AuthorAvatar img="/img/base.png" time={item.date.split(' ')[1].slice(0, 5)} />

          <div className="wrap">

            <div className="header-msg">
              <AuthorName name={item.author} comment={item.channel} />

              <div className="box-button">
                <Button>Левый</Button>
                <Button>Центр</Button>
                <Button>Правый</Button>
              </div>

              <div className="box-options">
                <Icons icon="exit" className="exit" />
                <Icons icon="maxi" className="min-max" />
                <Icons icon="option" className="option" />
                <Icons icon="star" className="star" active={activeFavs(item)} onClick={handleFavourites} />
              </div>
            </div>

            <div className="context-msg">
              <Context>{item.content}</Context>

              {
                Object.entries(item).map(([key, value]) => {
                  if (key === 'attachments') {
                    if (value.length > 0) {
                      return value.map((attach, k) => {
                        if (attach.type === 'video') {
                          return (
                            <div className="img-msg" key={k}>
                              <video className='video' controls="controls">
                                <source src={attach.url}></source>
                              </video>
                            </div>
                          )
                        } else if (attach.type === 'image') {
                          return (
                            <div className="img-msg" key={k}>
                              <Imgs src={attach.url} />
                            </div>
                          )
                        }
                      })
                    }
                  }
                })
              }

            </div>
          </div>

          <HashLinck data={[{ href: "#new", text: '#Новое', active: true }, { href: "#expert", text: '#Эксперт', active: false }]} />
        </div>
      )
    }
    )
  );
}

export default Messanger;
