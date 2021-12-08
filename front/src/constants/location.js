export const locations = [
  {value: 'seoul', label: '서울'},
  {value: 'incheon', label: '인천'},
  {value: 'gyeong-gi', label:'경기'},
  {value: 'daegu', label:'대구'},
  {value: 'busan', label: '부산'},
  {value: 'daejeon', label: '대전'},
  {value: 'ulsan', label: '울산'},
  {value: 'gwangju', label: '광주'},
]

export const getLocationLabel = (value) => {
  const label = locations.filter(v => v.value === value);
  return label[0].label;
}