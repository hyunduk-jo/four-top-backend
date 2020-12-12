import { adjectives, nouns } from './word';
import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import jwt from 'jsonwebtoken';

export const generateSecret = () => {
  const random = Math.floor(Math.random() * nouns.length);
  return `${adjectives[random]} ${nouns[random]}`;
}

const sendMail = (email) => {
  const auth = {
    auth: {
      api_key: process.env.MG_API_KEY,
      domain: process.env.MG_DOMAIN
    }
  }
  const client = nodemailer.createTransport(mg(auth));
  return client.sendMail(email);
}

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "fourtop@printer.com",
    to: address,
    subject: "Login Secret for Four Top",
    html: `<strong>${secret}</strong>`
  }
  return sendMail(email);
}

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
}