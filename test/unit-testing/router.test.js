const router = require("../../router");
const express = require("express");

test("Success", () => {
  router.apply(express());
});
