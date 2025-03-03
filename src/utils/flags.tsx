import { ReactNode } from "react";

export const getFlagCountry = (nat: string): ReactNode => {
  const flagCountryMap: Record<string, ReactNode> = {
    AUT: <span className="fi fi-at"></span>, // Autriche
    BEL: <span className="fi fi-be"></span>, // Belgique
    BUL: <span className="fi fi-bg"></span>, // Bulgarie
    CAN: <span className="fi fi-ca"></span>, // Canada
    CHN: <span className="fi fi-cn"></span>, // Chine
    CRO: <span className="fi fi-hr"></span>, // Croatie
    CZE: <span className="fi fi-cz"></span>, // République Tchèque
    DEN: <span className="fi fi-dk"></span>, // Danemark
    EST: <span className="fi fi-ee"></span>, // Estonie
    FIN: <span className="fi fi-fi"></span>, // Finlande
    FRA: <span className="fi fi-fr"></span>, // France
    GER: <span className="fi fi-de"></span>, // Allemagne
    GBR: <span className="fi fi-gb"></span>, // Royaume-Uni
    GRE: <span className="fi fi-gr"></span>, // Grèce
    HUN: <span className="fi fi-hu"></span>, // Hongrie
    ITA: <span className="fi fi-it"></span>, // Italie
    JPN: <span className="fi fi-jp"></span>, // Japon
    KAZ: <span className="fi fi-kz"></span>, // Kazakhstan
    KOR: <span className="fi fi-kr"></span>, // Corée du Sud
    LAT: <span className="fi fi-lv"></span>, // Lettonie
    LTU: <span className="fi fi-lt"></span>, // Lituanie
    MDA: <span className="fi fi-md"></span>, // Moldavie
    NOR: <span className="fi fi-no"></span>, // Norvège
    NED: <span className="fi fi-nl"></span>, // Pays-Bas
    POL: <span className="fi fi-pl"></span>, // Pologne
    POR: <span className="fi fi-pt"></span>, // Portugal
    ROU: <span className="fi fi-ro"></span>, // Roumanie
    SLO: <span className="fi fi-si"></span>, // Slovénie
    SVK: <span className="fi fi-sk"></span>, // Slovaquie
    SWE: <span className="fi fi-se"></span>, // Suède
    SUI: <span className="fi fi-ch"></span>, // Suisse
    UKR: <span className="fi fi-ua"></span>, // Ukraine
    USA: <span className="fi fi-us"></span>, // États-Unis
  };

  return flagCountryMap[nat] ?? null;
};
