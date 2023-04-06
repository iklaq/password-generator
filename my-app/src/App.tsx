import * as React from "react";
import { Accordion, Panel } from "baseui/accordion";
import { Button } from "baseui/button";
import { Card, StyledAction } from "baseui/card";
import { Checkbox } from "baseui/checkbox";
import { Input } from "baseui/input";
import { Slider } from "baseui/slider";
import { type } from "os";

const App: React.FC = () => {
  const [value, setValue] = React.useState<string>("");
  const [sliderValue, setSliderValue] = React.useState<number[]>([8]);
  const [checked, setChecked] = React.useState<{
    aToz: boolean;
    zeroToNine: boolean;
    specialSymbols: boolean;
  }>({
    aToz: false,
    zeroToNine: false,
    specialSymbols: false,
  });

  React.useEffect(() => {
    type typeOfCharacters = {
      capitalLetters: string;
      smallLetters: string;
      zeroToNine: string;
      symbols: string;
    };
    const characters: typeOfCharacters = {
      capitalLetters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      smallLetters: "abcdefghijklmnopqrstuvwxyz",
      zeroToNine: "0123456789",
      symbols: `!"#$%&:;<=>?@'({|}~)*+,-[]^_./`,
    };

    let passwordCombination: string = characters.smallLetters;
    if (checked.aToz) passwordCombination += characters.capitalLetters;
    if (checked.zeroToNine) passwordCombination += characters.zeroToNine;
    if (checked.specialSymbols) passwordCombination += characters.symbols;

    let generatedPassword = "";

    for (let i = 0; i < sliderValue[0]; i++) {
      const index: number = Math.floor(
        Math.random() * passwordCombination.length
      );
      generatedPassword += passwordCombination[index];
    }

    setValue(generatedPassword);
  }, [checked, sliderValue]);

  const copyToClipboard = async (): Promise<void> => {
    await navigator.clipboard.writeText(value);
    alert("Copied");
  };

  return (
    <Card>
      <Input
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <StyledAction>
        <Button
          onClick={() => copyToClipboard()}
          overrides={{
            BaseButton: {
              style: {
                width: "100%",
              },
            },
          }}
        >
          Copy
        </Button>
      </StyledAction>
      <Accordion>
        <Panel title="Options">
          <div className="slider">
            <h3>Length</h3>
            <Slider
              value={sliderValue}
              onChange={({ value }) => setSliderValue(value)}
            />
          </div>
          <div className="checkbox">
            <Checkbox
              checked={checked.aToz}
              onChange={() => setChecked({ ...checked, aToz: !checked.aToz })}
            >
              A-Z
            </Checkbox>
            <Checkbox
              checked={checked.zeroToNine}
              onChange={() =>
                setChecked({ ...checked, zeroToNine: !checked.zeroToNine })
              }
            >
              0-9
            </Checkbox>
            <Checkbox
              checked={checked.specialSymbols}
              onChange={() =>
                setChecked({
                  ...checked,
                  specialSymbols: !checked.specialSymbols,
                })
              }
            >
              %@#
            </Checkbox>
          </div>
        </Panel>
      </Accordion>
    </Card>
  );
};

export default App;
