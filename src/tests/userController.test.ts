import axios from "axios";
import { getAllUsers, getUserById, getUserRepos } from "../controllers/userController";
import { Request, Response } from "express";

const APIURL = 'https://api.github.com/users';
const next = jest.fn();

describe("getAllUsers", () => {
  
  it("should fetch all users", async () => {
    const req = { params: {} };
    const res = { json: jest.fn() };
    const usersData = [{ id: 1, name: "John" }, { id: 2, name: "Jane" }];
    const linkHeader = "<https://api.github.com/users?since=2>; rel=\"next\"";
    const headers = { link: linkHeader };

    axios.get = jest.fn().mockResolvedValueOnce({ data: usersData, headers });

    await getAllUsers(req as Request, res as unknown as Response, next);

    expect(axios.get).toHaveBeenCalledWith(APIURL);
    expect(res.json).toHaveBeenCalledWith({ data: usersData, link: linkHeader });
  });

  it("should fetch users since a certain id", async () => {
    const sinceId = 123;
    const req = { params: { since: sinceId } };
    const res = { json: jest.fn() };
    const usersData = [{ id: 124, name: "Jack" }, { id: 125, name: "Jill" }];
    const headers = {};



    axios.get = jest.fn().mockResolvedValueOnce({ data: usersData, headers });

    await getAllUsers(req as any, res as any, next);

    expect(axios.get).toHaveBeenCalledWith(`https://api.github.com/users?since=${sinceId}`);
    expect(res.json).toHaveBeenCalledWith({ data: usersData, link: undefined });
  });
});

describe("getUserById", () => {
  it("should fetch user by id", async () => {
    const username = "testUser";
    const req = { params: { username } };
    const res = { json: jest.fn() };
    const userData = { id: 123, username: "testUser", email: "test@example.com" };
    axios.get = jest.fn().mockResolvedValueOnce({ data: userData });

    await getUserById(req as unknown as Request, res as unknown as Response, next);

    expect(axios.get).toHaveBeenCalledWith(`${APIURL}/${username}`);
    expect(res.json).toHaveBeenCalledWith(userData);
  });
});

describe("getUserRepos", () => {
  it("should fetch user repos", async () => {
    const username = "testUser";
    const req = { params: { username } };
    const res = { json: jest.fn() };
    const reposData = [{ id: 1, name: "repo1" }, { id: 2, name: "repo2" }];
    axios.get = jest.fn().mockResolvedValueOnce({ data: reposData });

    await getUserRepos(req as unknown as Request, res as unknown as Response, next);

    expect(axios.get).toHaveBeenCalledWith(`${APIURL}/${username}/repos`);
    expect(res.json).toHaveBeenCalledWith(reposData);
  });
});
