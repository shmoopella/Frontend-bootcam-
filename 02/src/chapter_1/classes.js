"use strict"
export class Employee {
  name = ''
  grade = 'L1'
  hardSkills = ['']
  company = ''
  constructor(name, grade, company, ...hardSkills) {
    this.name = name;
    this.grade = grade;
    this.hardSkills = hardSkills;
    this.company = company;
  }
  changeCompany(newCompanyName) {
    if (newCompanyName) {
      this.company = newCompanyName;
    }
  }

  upgrade() {
    switch (this.grade) {
      case 'L1':
        this.grade = 'L2';
        break;
      case 'L2':
        this.grade = 'L3';
        break;
      case 'L3':
        this.grade = 'L4'
        break;
    }
  }

  addSkill(...newSkillName) {
    if (newSkillName.length !== 0) {
      this.hardSkills.push(newSkillName);
    }
  }
}
