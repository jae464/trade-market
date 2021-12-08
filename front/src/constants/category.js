export const categories = [
  {value: 'elect', label:'디지털/가전'},
  {value: 'clothes', label: '의류'},
  {value: 'shoes', label: '신발'},
  {value: 'watch', label:'시계'},
  {value: 'accessary', label:'악세서리'},
  {value: 'sports', label:'스포츠/레저'},
  {value: 'book', label:'도서'},
  {value:'music', label:'음반/악기'},
  {value: 'lifestyle', label:'생활'},
  {value: 'furniture', label:'가구/인테리어'},
  {value: 'ext', label:'기타'},
]

export const getLabel = (value) => {
  const label = categories.filter(v => v.value === value);
  return label[0].label;
}