const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

const students = xmlDoc.querySelectorAll('student');

const result = {
  list: []
};

students.forEach(student => {
  const nameNode = student.querySelector('name');
  const first = nameNode.querySelector('first').textContent;
  const second = nameNode.querySelector('second').textContent;
  const age = Number(student.querySelector('age').textContent);
  const prof = student.querySelector('prof').textContent;
  const lang = nameNode.getAttribute('lang');

  result.list.push({
    name: `${first} ${second}`,
    age: age,
    prof: prof,
    lang: lang
  });
});

console.log(`{`);
console.log(`  list: [`);
result.list.forEach((s, i, arr) => {
  const comma = i < arr.length - 1 ? ',' : '';
  console.log(`    { name: '${s.name}', age: ${s.age}, prof: '${s.prof}', lang: '${s.lang}' }${comma}`);
});
console.log(`  ]`);
console.log(`}`);
