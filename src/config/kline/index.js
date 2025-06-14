//启用的功能
import enabled_features from './enabled-features'
//面板上禁用的功能
import disabled_features from './disabled-features'
//柱状图颜色
import studies_overrides from './studies-overrides'
//主要配置
import { getOverrides } from './overrides'
//设置初始化加载条样式
import { getLoadingScreen } from './loading-screen'

export const getConfig = (theme) => {
  return {
    enabled_features,
    disabled_features,
    studies_overrides,
    overrides: getOverrides(theme),
    loading_screen: getLoadingScreen(theme)
  }
}

/**
 * 分辨率
 */
export const getIntervalList = () => {
  let tempList = [
    {
      label: `1秒`,
      value: '1M',
      interval: '1',
      key: 'ONE_MIN'
    },
    {
      label: `5秒`,
      value: '5M',
      interval: '5',
      key: 'FIVE_MIN',
      market: 'mt5'
    },
    {
      label: `15秒`,
      value: '15M',
      interval: '15',
      key: 'FIFTEEN_MIN',
      market: 'mt5'
    },
    {
      label: `30秒`,
      value: '30M',
      interval: '30',
      key: 'THIRTY_MIN',
      market: 'mt5'
    },
    {
      label: `1分钟`,
      value: '1H',
      interval: '60',
      key: 'ONE_HOUR',
      market: 'mt5'
    },
    {
      label: `2分钟`,
      value: '2H',
      interval: '120',
      key: 'TWO_HOUR'
    },

    {
      label: `6分钟`,
      value: '6H',
      interval: '360',
      key: 'SIX_HOUR',
      isMore: true
    },

    {
      label: `1天`,
      value: '1D',
      interval: '1d',
      key: 'ONE_DAY',
      isMore: true,
      market: 'mt5'
    },
    {
      label: `3天`,
      value: '3D',
      interval: '3d',
      key: 'ONE_DAY',
      isMore: true
    },
    //周线
    {
      label: `1周`,
      value: '1W',
      interval: 'W',
      key: 'ONE_WEEK',
      isMore: true,
      market: 'mt5'
    }
  ]
  return tempList
}

/**
 * 指标配置
 */
export const getStudyList = () => [
  {
    label: 'MA',
    name: 'Moving Average',
    colorList: ['#E5BF39', '#7CC7BA', '#C5A0E0'],
    cycleList: [5, 10, 30],
    studyList: []
  },
  {
    label: 'EMA',
    name: 'Moving Average Exponential',
    colorList: ['#E5BF39', '#7CC7BA', '#C5A0E0'],
    cycleList: [5, 10, 30],
    studyList: []
  },
  {
    label: 'BOLL',
    name: 'Bollinger Bands',
    colorList: ['#E5BF39', '#7CC7BA', '#C5A0E0'],
    cycleList: [14],
    studyList: []
  },
  {
    label: 'MACD',
    name: 'MACD',
    colorList: ['#E5BF39', '#7CC7BA', '#C5A0E0'],
    cycleList: [12],
    studyList: []
  },
  // {
  //   label: 'KDJ',
  //   name: 'KDJ Indicator',
  //   colorList: ['#7B2B8C', '#5FABAC', '#886024'],
  //   cycleList: [9, 3],
  //   studyList: []
  // },
  {
    label: 'RSI',
    name: 'Relative Strength Index',
    colorList: ['#7B2B8C', '#5FABAC', '#886024'],
    cycleList: [6],
    studyList: []
  },
  {
    label: 'WR',
    name: 'Williams %R',
    colorList: ['#886024'],
    cycleList: [14],
    studyList: []
  }
]
