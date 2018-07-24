import { Injectable } from '@angular/core';
import { Player } from './player';
import { Subject } from '../../node_modules/rxjs';

const DEFAULT_POINTS_TO_WIN = 200;

@Injectable({
  providedIn: 'root'
})
export class GameService {
  players: Player[] = [];
  needPointsToWin = DEFAULT_POINTS_TO_WIN;
  players$: Subject<Player[]> = new Subject<Player[]>();
  addPlayer(player: string | Player) {
    const playerInst: Player = typeof player === 'string' ? <Player>{
      name: player,
      score: 0
    } : player;
    const id = this.players.push(playerInst) - 1;
    this.players[id].id = id;
    this._updatePlayers();
  }
  removePlayer(player: Player) {
    this.players.filter(pl => pl !== player);
    this._updatePlayersId();
  }
  removeAllPlayers() {
    this.players = [];
    this._updatePlayers();
  }
  addPointsTo(player: Player, points: number) {
    player.score += points;
    this._updatePlayers();
  }
  setPointsToWin(points: number) {
    this.needPointsToWin = points;
    this._updatePlayers();
  }
  rematch() {
    this.players.forEach((_, i , arr) => arr[i].score = 0);
    this._updatePlayers();
  }
  newGame() {
    this.removeAllPlayers();
    this.needPointsToWin = DEFAULT_POINTS_TO_WIN;
    this._updatePlayers();
  }
  private _updatePlayersId() {
    this.players.forEach((_, i , arr) => arr[i].id = i);
    this._updatePlayers();
  }
  private _updatePlayers() {
    this.players$.next(this.players);
  }
  constructor() { }
}
