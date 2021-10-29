import { Request, Response } from "express";

export function home(req: Request, res: Response) {
  res.sendFile("index.html", { root: "./" });
}

export function hello(req: Request, res: Response) {
  res.json("hello world");
}
export function date(req: Request, res: Response) {
  let givenDate: number | Date;
  if (isUNIX(req.params.date)) {
    givenDate = parseInt(req.params.date);
    res
      .status(200)
      .json({ unix: givenDate, utc: new Date(givenDate).toUTCString() });
  } else {
    givenDate = new Date(req.params.date);
    if (givenDate.toString() == "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    }
    res
      .status(200)
      .json({ unix: givenDate.getTime(), utc: givenDate.toUTCString() });
  }
}

function isUNIX(date: string): boolean {
  return /\d{5,}/.test(date);
}

export function currentTime(req: Request, res: Response) {
  return res
    .status(200)
    .json({ unix: Date.now(), utc: new Date().toUTCString() });
}
