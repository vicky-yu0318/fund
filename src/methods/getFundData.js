export function getFundData () {
  const fundData = [
    {
      fund: '富蘭克林基金',
      company: '富邦投顧',
      code: '00400000',
      // asset: { 大宗商品: { detail: ['天然資源股票'] } },
      asset: { 大宗商品: ['天然資源股票'] },
      currency: '台幣',
      rating: '4',
      established: 667785600000,
      risk: '保守型',
      scaleMillion: 2000,
      performance: {
        '3 month': '2%',
        '1 year': '10%',
        '3 year': '15%',
        establishToNow: '10%'
      }
    },
    {
      fund: '摩根新興35基金',
      company: '富邦投顧',
      code: '00200000',
      // asset: { 新興市場股票: { detail: ['拉丁美洲股票'] } },
      asset: { 新興市場股票: ['拉丁美洲股票'] },
      currency: '美元',
      rating: '3',
      established: 946656000000,
      risk: '穩健型',
      scaleMillion: 2000,
      performance: {
        '3 month': '25%',
        '1 year': '55%',
        '3 year': '60%',
        establishToNow: '80%'
      }
    },
    {
      fund: '安聯美國短年期高收益債券基金',
      company: '富邦投信',
      code: '00302200',
      // asset: { 高收益債: { detail: ['亞洲高收益債'] } },
      asset: { 高收益債: ['亞洲高收益債'] },
      currency: '台幣',
      rating: '1',
      established: 1577836800000,
      risk: '非常積極型',
      scaleMillion: 950,
      performance: {
        '3 month': '30%',
        '1 year': '10%',
        '3 year': '-10%',
        establishToNow: '-5%'
      }
    },
    {
      fund: '債券基金',
      company: '玉山投信',
      code: '00303300',
      // asset: { 高收益債: { detail: ['全球/美/歐高收益債'] } },
      asset: { 高收益債: ['全球/美/歐高收益債'] },
      currency: '台幣',
      rating: '1',
      established: 1577836800000,
      risk: '非常積極型',
      scaleMillion: 950,
      performance: {
        '3 month': '30%',
        '1 year': '10%',
        '3 year': '-10%',
        establishToNow: '-5%'
      }
    },
    {
      fund: '高收益',
      company: '國泰投顧',
      code: '00300044',
      // asset: { 大宗商品: { detail: ['貴金屬股票'] } },
      asset: { 大宗商品: ['貴金屬股票'] },
      currency: '台幣',
      rating: '1',
      established: 1577836800000,
      risk: '非常積極型',
      scaleMillion: 950,
      performance: {
        '3 month': '30%',
        '1 year': '10%',
        '3 year': '-10%',
        establishToNow: '-5%'
      }
    },
    {
      fund: '短年期高',
      company: '國泰投信',
      code: '00300555',
      // asset: { 大宗商品: { detail: ['農產品'] } },
      asset: { 大宗商品: ['農產品'] },
      currency: '台幣',
      rating: '1',
      established: 1577836800000,
      risk: '非常積極型',
      scaleMillion: 950,
      performance: {
        '3 month': '30%',
        '1 year': '10%',
        '3 year': '-10%',
        establishToNow: '-5%'
      }
    },
    {
      fund: '美國',
      company: '中信投顧',
      code: '00300666',
      // asset: { 新興市場股票: { detail: ['新興市場股票'] } },
      asset: { 新興市場股票: ['新興市場股票'] },
      currency: '台幣',
      rating: '1',
      established: 1577836800000,
      risk: '非常積極型',
      scaleMillion: 950,
      performance: {
        '3 month': '30%',
        '1 year': '10%',
        '3 year': '-10%',
        establishToNow: '-5%'
      }
    },
    {
      fund: '安聯',
      company: '中信投信',
      code: '00300777',
      // asset: { 新興市場股票: { detail: ['新興單一國家股票'] } },
      asset: { 新興市場股票: ['新興單一國家股票'] },
      currency: '台幣',
      rating: '1',
      established: 1577836800000,
      risk: '非常積極型',
      scaleMillion: 950,
      performance: {
        '3 month': '30%',
        '1 year': '10%',
        '3 year': '-10%',
        establishToNow: '-5%'
      }
    }
  ]

  return fundData
}
