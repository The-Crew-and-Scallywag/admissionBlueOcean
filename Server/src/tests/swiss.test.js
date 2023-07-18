import { it, expect, describe } from "vitest";

const swissArmyKnife = {
  miniScissors: function (item) {
    const result = "cutting " + item;
    console.log("miniScissors result:", result);
    return result;
  },
  toothpick: function () {
    const result = "clink clink";
    console.log("toothpick result:", result);
    return result;
  },
  twezzers: function () {
    const result = "pluck pluck";
    console.log("twezzers result:", result);
    return result;
  },
};

describe("swissArmyKnife", () => {
  it("should cut the specified item using miniScissors", () => {
    const result = swissArmyKnife.miniScissors("paper");
    console.log("Test result:", result);
    expect(result).toEqual("cutting paper");
  });

  it("should make a clinking sound when using toothpick", () => {
    const result = swissArmyKnife.toothpick();
    console.log("Test result:", result);
    expect(result).toEqual("clink clink");
  });

  it("should make a plucking sound when using twezzers", () => {
    const result = swissArmyKnife.twezzers();
    console.log("Test result:", result);
    expect(result).toEqual("pluck pluck");
  });

  it("should convert the argument to a string and perform cutting with miniScissors", () => {
    const result = swissArmyKnife.miniScissors(123);
    console.log("Test result:", result);
    expect(result).toEqual("cutting 123");
  });

  it("should cut nothing when an empty string is passed to miniScissors", () => {
    const result = swissArmyKnife.miniScissors("");
    console.log("Test result:", result);
    expect(result).toEqual("cutting ");
  });

  it("should make a clinking sound each time toothpick is used", () => {
    const result1 = swissArmyKnife.toothpick();
    const result2 = swissArmyKnife.toothpick();
    console.log("Test result 1:", result1);
    console.log("Test result 2:", result2);
    expect(result1).toEqual("clink clink");
    expect(result2).toEqual("clink clink");
  });

  it("should make a plucking sound each time twezzers are used", () => {
    const result1 = swissArmyKnife.twezzers();
    const result2 = swissArmyKnife.twezzers();
    console.log("Test result 1:", result1);
    console.log("Test result 2:", result2);
    expect(result1).toEqual("pluck pluck");
    expect(result2).toEqual("pluck pluck");
  });
});
