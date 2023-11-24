CREATE DATABASE pdv;

CREATE TABLE usuarios (
    id serial primary key,
    nome text not null,
    email text unique not null,
    senha text not null
);

CREATE TABLE categorias(
    id serial primary key,
    descricao text
);

CREATE TABLE produtos (
    id serial primary key,
    descricao text not null,
    quantidade_estoque int,
    valor int not null,
    categoria_id integer references categorias(id)
);

CREATE TABLE clientes(
    id serial primary key,
    nome text not null,
    email text not null unique,
    cpf text not null  unique,
    cep text,
    rua text,
    numero text,
    bairro text,
    cidade text,
    estado text
);


CREATE TABLE pedidos (
    id serial primary key,
    cliente_id integer references clientes(id),
    observacao text,
    valor_total integer
);

CREATE TABLE pedido_produtos (
    id serial primary key,
    pedido_id integer references pedidos(id),
    produto_id integer references produtos(id),
    quantidade_produto int,
    valor_produto int
);

ALTER TABLE produtos
ADD produto_imagem text;





INSERT INTO categorias(descricao)
values
    ('Informática'),
    ('Celulares'),
    ('Beleza e Perfumaria'),
    ('Mercado'),
    ('Livros e Papelaria'),
    ('Brinquedos'),
    ('Moda'),
    ('Bebê'),
    ('Games')
;