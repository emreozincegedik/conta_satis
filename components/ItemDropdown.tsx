"use client";
import { Autocomplete, TextField, Grid } from "@mui/material";
import itemsJson from "@/utils/items.json";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  id: number | undefined;
}
export const ItemDropdown = ({ id }: Props) => {
  const router = useRouter();
  const item = itemsJson.find((item) => item.id.toString() === id?.toString());

  const [value, setValue] = useState<string | null | undefined>(item?.title);
  const [inputValue, setInputValue] = useState("");

  return (
    <Grid
      container
      justifyContent="flex-end"
      alignItems="flex-end"
      spacing={2}
      sx={{ padding: 2 }} // Adjust padding as needed
    >
      <Grid item>
        <Autocomplete
          value={value}
          onChange={(event: any, newValue: string | null) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            const selectedItem = itemsJson.find(
              (item) => item.title === newInputValue
            );
            if (selectedItem) {
              router.push("/item/" + selectedItem.id);
            }
          }}
          id="controllable-states-demo"
          options={itemsJson.map((option) => option.title)}
          renderInput={(params) => <TextField {...params} label="Items" />}
          sx={{ width: 300 }}
        />
      </Grid>
    </Grid>
  );
};
