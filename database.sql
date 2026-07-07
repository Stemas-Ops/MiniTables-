CREATE TABLE treinador (
    id_treinador SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT
);

CREATE TABLE pokedex (
    id_pokedex SERIAL PRIMARY KEY,
    id_treinador INT UNIQUE NOT NULL,
    pokemon_favorito VARCHAR(100),

    CONSTRAINT fk_pokedex_treinador
        FOREIGN KEY (id_treinador)
        REFERENCES treinador(id_treinador)
);

CREATE TABLE pokemon (
    id_pokemon SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nivel INT NOT NULL,
    id_treinador INT NOT NULL,

    CONSTRAINT fk_pokemon_treinador
        FOREIGN KEY (id_treinador)
        REFERENCES treinador(id_treinador)
);

CREATE TABLE tipo (
    id_tipo SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE pokemon_tipo (
    id_pokemon INT NOT NULL,
    id_tipo INT NOT NULL,

    PRIMARY KEY(id_pokemon, id_tipo),

    CONSTRAINT fk_pt_pokemon
        FOREIGN KEY(id_pokemon)
        REFERENCES pokemon(id_pokemon),

    CONSTRAINT fk_pt_tipo
        FOREIGN KEY(id_tipo)
        REFERENCES tipo(id_tipo)
);