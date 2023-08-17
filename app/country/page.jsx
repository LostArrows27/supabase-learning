"use client";

import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { pipeline } from "@xenova/transformers";
// type CountryType = Database["public"]["Tables"]["orders"]["Row"];

function Page() {
  const [out, setOut] = useState();
  async function test() {
    let pipe = await pipeline("sentiment-analysis");
    console.log(pipe);
    setOut(await pipe("I love transformers!"));
  }
  useEffect(() => {
    async function testTransform() {}
    testTransform();
  }, []);

  return (
    <>
      <div className="">Page</div>
      <Button onClick={test}>Test</Button>
    </>
  );
}

export default Page;
