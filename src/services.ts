import { Request, Response } from "express";

export function home(req: Request, res: Response) {
  res.sendFile("index.html", { root: "./" });
}

export function hire(req: Request, res: Response) {
  try {
    let { empId, fullname, email, departmentId, positionId, startDate } =
      req.body;
    if (!fullname || !email || !departmentId || !positionId)
      return res.status(404).json({ error: "Missing parameters." });
    if (empId)
      return res.status(404).json({ error: "Employee already exists." });

    startDate = startDate ? startDate : new Date();
    empId = "E_" + employees.length + 100;
    let newEmp = { empId, fullname, email, startDate };

    //Add employee
    employees.push(newEmp);

    //Update Emp_department
    let depInfo: any = departments.find(
      (dep: any) => dep.depId == departmentId
    );
    let posInfo: any = positions.find(
      (position: any) => position.posId == positionId
    );
    let emp_depObj = { empId, depId: depInfo.depId, posId: posInfo.posId };
    emp_dep.push(emp_depObj);

    res.status(200).json({ newEmp, msg: "New Employee hired!", emp_dep });
  } catch (err) {
    console.log("Error while adding employee", err);
    res.json({ err });
  }
}

export function getEmployees(req: Request, res: Response) {
  try {
    res.json({ employees });
  } catch (err) {
    console.log("Error while fetching all employees", err);
    res.json({ err });
  }
}

export function promote(req: Request, res: Response) {
  try {
    let { empId, depId, posId } = req.body;
    if (!empId || !posId || !depId)
      return res
        .status(404)
        .json({ error: "Missing parameters. Please pass proper payload" });
    //check if empId, depId and posId are correct/exists
    let empExists = employees.find((emp: any) => emp.empId == empId);
    if (!empExists)
      return res.status(404).json({ error: "Employee doesn't exists." });
    let posExists = positions.find((pos: any) => pos.posId == posId);
    if (!posExists)
      return res.status(404).json({ error: "Position doesn't exists." });
    let depExists = departments.find((dep: any) => dep.depId == depId);
    if (!depExists)
      return res.status(404).json({ error: "Department doesn't exists." });

    //update emp_dep table
    emp_dep = emp_dep.map((empdep: any) => {
      if (empdep.empId == empId) empdep = { ...empdep, ...req.body };
      return empdep;
    });
    res.status(200).json({ msg: "Employee promoted", emp_dep });
  } catch (err) {
    console.log("Error while updating employee", err);
    res.json({ err });
  }
}

export function fireEmployee(req: Request, res: Response) {
  try {
    let { empId, depId, posId } = req.body;
    if (!empId || !posId || !depId)
      return res
        .status(404)
        .json({ error: "Missing parameters. Please pass proper payload" });
    //check if empId, depId and posId are correct/exists
    let empExists = emp_dep.find(
      (empdep: any) =>
        empdep.empId == empId && empdep.posId == posId && empdep.depId == depId
    );
    if (!empExists)
      return res
        .status(404)
        .json({ error: "Employee, position and department doesn't match." });

    //remove from emp_dep table
    emp_dep = emp_dep.filter((empdep: any) => empdep.empId !== empId);
    employees = employees.filter((emp: any) => emp.empId !== empId);
    res.status(200).json({ msg: "Employee fired!", employees, emp_dep });
  } catch (err) {
    console.log("Error while adding employee", err);
    res.json({ err });
  }
}

export let employees: Array<Object> = [];

export let departments: Array<Object> = [
  { depName: "IT", depId: "IT_01" },
  { depName: "Administrative", depId: "AD_02" },
];

export let positions: Array<Object> = [
  { depId: "IT_01", positionName: "Junior Developer", posId: "JD_01" },
  { depId: "IT_01", positionName: "Senior Developer", posId: "SD_02" },
  { depId: "AD_02", positionName: "Founder", posId: "F_03" },
  { depId: "AD_02", positionName: "CTO", posId: "CTO_04" },
];

export let emp_dep: Array<Object> = [];
