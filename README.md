# Slottr

Simple React + Rails for slot booking management.

## Requirements
* Ruby 3.1.2
* Node 16.18.1

## Project setup
Go in the base folder and run:
```
bundle
npm install
rails db:create
rails db:migrate
rails db:seed
```

## Starting
You can either run
```
rails assets:precompile
rails s
```

OR

run
```
rails s
```

And then in another terminal tab run

```
npm run dev
```

Either way, you can open your browser and go to `localhost:3000`.

## Specs
Just run `rspec`