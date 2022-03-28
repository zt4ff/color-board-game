import { CoolDown } from "../../game_websocket/cooldown";

const dateNowSpy = jest
  .spyOn(Date, "now")
  .mockImplementationOnce(() => 1000)
  .mockImplementationOnce(() => 1300)
  .mockImplementation(() => 2000);

describe("Cooldown", () => {
  afterAll(() => {
    dateNowSpy.mockRestore();
  });

  test("cooldown returns true or false based on the necessary information", () => {
    const cooldown = new CoolDown(500);

    expect(cooldown.check()).toBe(true);
    expect(cooldown.check()).toBe(true);
    expect(cooldown.check()).toBe(false);
  });
});
