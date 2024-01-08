import { Impact, ImpactPlayer } from "../models/session.model";

function validateEmail(email: string): boolean {
  // Regular expression for a basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

function mapToImpactPlayers(data: {
  [key: number]: {
    magnitude: number;
    direction: string;
    timestamp: number;
    isConcussion: boolean;
  }[];
}): ImpactPlayer[] {
  const impactPlayers: ImpactPlayer[] = [];

  for (const playerIdStr in data) {
    if (data.hasOwnProperty(playerIdStr)) {
      //   const playerId = playerIdStr.toString();
      const impactData = data[playerIdStr] as {
        magnitude: number;
        direction: string;
        timestamp: number;
        isConcussion: boolean;
      }[];
      const impacts: Impact[] = impactData.map(
        (impact) =>
          new Impact(
            impact.magnitude,
            impact.direction,
            impact.timestamp,
            impact.isConcussion
          )
      );

      const impactPlayer = new ImpactPlayer(Number(playerIdStr), impacts);
      impactPlayers.push(impactPlayer);
    }
  }

  return impactPlayers;
}

export { validateEmail, mapToImpactPlayers };
