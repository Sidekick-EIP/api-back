--Table User--

CREATE TABLE clients (
    id              SERIAL,
    username        varchar(255) not null,
    primary key(id)
);