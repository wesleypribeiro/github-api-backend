import { Request, Response } from "express";
import axios from "axios";
import asyncHandler from "../middlewares/asyncHandler";
import { extractSinceFromLinkHeader } from "../utils/extractSinceFromLinkHeader";

const APIURL = 'https://api.github.com/users';

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {

  const since = req.query.since;
  const page = req.query.page;
  const nextPageUrl = `${APIURL}?page=${page}${since ? `&since=${since}` : ''}`;

  const { data, headers: { link } } = await axios.get(APIURL, {
    params: {
      since,
      page
    }
  });

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