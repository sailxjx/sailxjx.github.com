/* eslint-disable jsx-quotes */
import React from 'react'
import CSSModules from 'react-css-modules'
import Header from '../../components/header'
import Article from '../../components/article'
import Album from '../../components/album'
import styles from '../../components/app/app.styl'

const images = [
  '/paints/20140922_qie.png',
  '/paints/20140920_chouxue.png',
  '/paints/20140918_songshu.png',
  '/paints/20140917_caocao.png',
  '/paints/20140915_liubei.png',
  '/paints/20140913_sunquan.png',
  '/paints/20140911_gelinghaotai.png',
  '/paints/20140909_xbox.png',
  '/paints/20140908_juzhong.png',
  '/paints/20140906_activite.png',
  '/paints/20140905_zhongqiu.png',
  '/paints/20140904_labaguaishou.png',
  '/paints/20140903_xiaolou.png',
  '/paints/20140902_feiji.png',
  '/paints/20140901_ditie.png',
  '/paints/20140831_xiaowanzi.png',
  '/paints/20140830_paomian.png',
  '/paints/20140829_wangzai.png',
  '/paints/20140828_duoduo.png'
]

class Paint extends React.Component {
  render () {
    let article = <div>
      <h1>Paints</h1>
      <Album images={images} />
    </div>
    return <div styleName="root">
      <Header />
      <Article>{article}</Article>
    </div>
  }
}

export default CSSModules(Paint, styles)
