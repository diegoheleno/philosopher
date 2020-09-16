import { Request, Response } from 'express';
import { database } from '../database';
import { defaultStage } from '../src/models/Stage';

function getStage(req: Request, res: Response) {
  const { id } = req.params
  const stage = id ? database.stage.get(parseInt(id)) : database.stage.get(0)
  return stage ? res.status(200).send(stage) : res.status(404).send(defaultStage);
}

function getStageLast(req: Request, res: Response) {
  const stage = database.stage.last()
  return stage ? res.status(200).send(stage) : res.status(404).send(defaultStage);
}

function getStageNext(req: Request, res: Response) {
  const stage = database.stage.next()
  return stage ? res.status(200).send(stage) : res.status(404).send(defaultStage);
}

function postStage(req: Request, res: Response) {
  const { params } = req.body;
  const stage = database.stage.save(params)
  return stage ? res.status(200).send(stage) : res.status(404).send(defaultStage);
}

export default {
  'GET /api/stage/:id': getStage,
  'GET /api/stage/last': getStageLast,
  'GET /api/stage/next': getStageNext,
  'POST /api/stage': postStage,
};
