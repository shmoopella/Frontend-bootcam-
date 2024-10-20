"use strict"
import { Employee } from "./classes.js";

class Company {
  constructor(companyName) {
    if (Boolean(companyName)) {
      this.companyName = companyName;
      this.currentProjects = [];
      this.completedProjects  = [];
      this.staff = {
        developers: {
          frontend: [],
          backend: []
        },
        managers: []
      };
    } else {
      throw new Error('The name of company can`t be empty!');
    }
  }

  addNewCompanyMember(member) {
    if (member instanceof Frontend) {
      this.staff.developers.frontend.push(member);
      member.changeCompany(this.companyName);
    } else if (member instanceof Backend) {
      this.staff.developers.backend.push(member)
      member.changeCompany(this.companyName);
    } else if (member instanceof Manager) {
      this.staff.managers.push(member);
      member.changeCompany(this.companyName);
    } else {
      throw new Error("Can't add this member!")
    }
  }

  addProject(project) {
    if (project instanceof Project) {
      this.currentProjects.push(project);
    } else {
      throw new Error('This is no project!');
    }
  }

  getMembersQuantity() {
    return this.staff.managers.length + this.staff.developers.frontend.length + this.staff.developers.backend.length;
  }

  completeProject(project) {
    if (project instanceof Project) {
      let findIndex = this.currentProjects.indexOf(project);
      if (findIndex !== -1) {
        this.currentProjects.splice(findIndex, 1);
        this.completedProjects.push(project);
        project.team.manager.projectQuantity++;
        this.hasProject = false;
        for (let member of project.team.developers.frontend) {
          member.projectQuantity++;
          this.hasProject = false;
        }
        for (let member of project.team.developers.backend) {
          member.projectQuantity++;
          this.hasProject = false;
        }
      }
    }
  }
}


class Project {
  constructor(projectName, minQualification) {
    this.projectName = projectName;
    this.minQualification = minQualification;
    this.team = {
      manager: undefined,
      developers: {
        frontend: [],
        backend: []
      }
    };
  }

  addNewProjectMember(member) {
    if (this.team.manager === undefined) {
      if (member instanceof Manager && !member.hasProject) {
        this.team.manager = member;
        member.hasProject = true;
      } else {
        throw new Error('The first you should add a manager to the project!');
      }
    } else {
      if (member instanceof Manager) {
        throw new Error('The project can have only one manager!');
      } else if (member instanceof Frontend && this.team.manager.checkMember(this.minQualification, member)) {
        this.team.developers.frontend.push(member);
        member.hasProject = true;
      } else if (member instanceof Backend && this.team.manager.checkMember(this.minQualification, member)) {
        this.team.developers.backend.push(member);
        member.hasProject = true;
      } else {
        throw new Error('Can`t add the member!');
      }
    }
  }
}

class Manager extends Employee {
  constructor(name, grade, company, ...hardSkills) {
    super(name, grade, company, ...hardSkills);
    this.projectQuantity = 0;
    this.hasProject = false;
  }
  checkMember(minQualification, member) {
    return member.grade >= minQualification && member.company === this.company && !member.hasProject;
  }
}

class Frontend extends Employee {
  constructor(name, grade, company, ...hardSkills) {
    super(name, grade, company, ...hardSkills);
    this.stack = ['']
    this.developerSide = 'frontend';
    this.projectQuantity = 0;
    this.hasProject = false;
  }
  expandStack(...someTech) {
    if (Boolean(someTech)) {
      this.stack.push(someTech);
    }
  }
}

class Backend extends Employee {
  constructor(name, grade, company, ...hardSkills) {
    super(name, grade, company, ...hardSkills);
    this.stack = [''];
    this.developerSide = 'backend';
    this.projectQuantity = 0;
    this.hasProject = false;
  }

  expandStack(someTech) {
    if (Boolean(someTech)) {
      this.stack.push(someTech);
    }
  }
}
