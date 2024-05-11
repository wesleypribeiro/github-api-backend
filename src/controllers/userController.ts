import { Request, Response } from "express";
import axios from "axios";
import asyncHandler from "../middlewares/asyncHandler";
import { extractSinceFromLinkHeader } from "../utils/extractSinceFromLinkHeader";

const APIURL = 'https://api.github.com/users?page=';

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const { page = '0', since } = req.query;
  const nextPageUrl = `${APIURL}${page}${since ? `&since=${since}` : ''}`;

  const { data, headers: { link } } = await axios.get(nextPageUrl);

  const nextSince = extractSinceFromLinkHeader(link);

  return res.json({ users: data, link: { url: link, since: nextSince } });
})

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { username } = req.params;

  const { data } = await axios.get(`${APIURL}/${username}`);

  return res.json(data);
})

export const getUserRepos = asyncHandler(async (req: Request, res: Response) => {
  const { username } = req.params;

  const { data } = await axios.get(`${APIURL}/${username}/repos`);

  return res.json(data);
})