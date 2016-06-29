/* eslint-disable jsx-quotes */
import React from 'react'
import CSSModules from 'react-css-modules'
import Header from '../../components/header'
import Article from '../../components/article'
import Album from '../../components/album'
import styles from '../../components/app/app.styl'

const images = [
  'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.134.1080.1080/13385703_995243117256268_2045329152_n.jpg?ig_cache_key=MTI3NzYwNTIyMTA3ODk0ODE0Mg%3D%3D.2.c',
  'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13392826_149020428843398_1347750592_n.jpg?ig_cache_key=MTI3NDczMDc0NDA3MDU2MDI2MA%3D%3D.2',
  'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.134.1080.1080/13398859_1058776384205619_735285580_n.jpg?ig_cache_key=MTI3MzI1NjczMDg0MDAzMDE5NQ%3D%3D.2.c',
  'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.134.1080.1080/13392836_1739573749653089_586399282_n.jpg?ig_cache_key=MTI3MjYxOTU5NTY3ODExMTkzMA%3D%3D.2.c',
  'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.134.1080.1080/13408766_991446974223998_1746475841_n.jpg?ig_cache_key=MTI3MTgwNzYxMDA1NzE1MzA1NA%3D%3D.2.c',
  'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.92.1080.1080/13388478_265170833844358_1439760400_n.jpg?ig_cache_key=MTI2ODkxODgwMjcxNDIyMDk5MQ%3D%3D.2.c'
  // '/paints/20140922_qie.png',
  // '/paints/20140920_chouxue.png',
  // '/paints/20140918_songshu.png',
  // '/paints/20140917_caocao.png',
  // '/paints/20140915_liubei.png',
  // '/paints/20140913_sunquan.png',
  // '/paints/20140911_gelinghaotai.png',
  // '/paints/20140909_xbox.png',
  // '/paints/20140908_juzhong.png',
  // '/paints/20140906_activite.png',
  // '/paints/20140905_zhongqiu.png',
  // '/paints/20140904_labaguaishou.png',
  // '/paints/20140903_xiaolou.png',
  // '/paints/20140902_feiji.png',
  // '/paints/20140901_ditie.png',
  // '/paints/20140831_xiaowanzi.png',
  // '/paints/20140830_paomian.png',
  // '/paints/20140829_wangzai.png',
  // '/paints/20140828_duoduo.png'
]

class Paint extends React.Component {
  render () {
    let article = <div>
      <h1>Paints</h1><Album images={images} />
    </div>
    return <div styleName="root">
      <Header />
      <Article article={article}/>
    </div>
  }
}

export default CSSModules(Paint, styles)
