import "./env";

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import mailgun from "nodemailer-mailgun-transport";

import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);

  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendMail = (email) => {
  const options = {
    auth: {
      api_key: process.env.MAILGUN_API,
      domain: process.env.MAILGUN_DOMAIN
    }
  }

  const nodemailerMailgun = nodemailer.createTransport(mailgun(options));

  return nodemailerMailgun.sendMail(email, (err, info) => {
    if ( err ) {
      console.log(`Error: ${err}`)
    } else {
      console.log(`Response: ${info}`)
    }
  });
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "yeop@prismagram.com",
    to: address,
    subject: "Login Secret for Prismagram",
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/web site to log in.`
  };
  return sendMail(email);
}

export const generateToken = (id) => jwt.sign( { id }, process.env.JWT_SECRET);