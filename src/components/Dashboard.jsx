import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  TableCaption,
  TableContainer,
  Flex,
  Button,
  Text,
  Image,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { MdAutoDelete } from "react-icons/md";

import { fetchExistingData } from "./helper/GetData";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { NumberFormate } from "./helper/NumberFormate";
import axios from "axios";
import { patchDataToServer } from "./helper/HandlePatch";
import Chef from "./media/Pizza maker-bro.svg";

export function Dashboard() {
  const toast = useToast();
  const [getAllPizzaEntry, setGetAllPizzaEntry] = useState();
  const [flag, setFlag] = useState(false);

  async function getAllEntry() {
    try {
      let data = await fetchExistingData();

      setGetAllPizzaEntry(data);
    } catch (e) {
      console.log(e.message);
    }
  }
  async function handledelete(id) {
    try {
      let res = await axios.delete(
        `${process.env.REACT_APP_RENDER_SERVER}/removePizza/${id}`
      );
      if (res) {
        toast({
          title: "Entry deleted successfully!",

          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      getAllEntry();
    } catch (e) {
      toast({
        title: e.meesage,

        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }
  useEffect(() => {
    getAllEntry();
  }, [flag]);

  async function getPizzaByDate(e) {
    const date = e.target.value;
    console.log(date);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_RENDER_SERVER}/getPizzaByDate/${date}`
      );
      setGetAllPizzaEntry(data);

      return data;
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <Box
      p={["2px", "3rem", "5rem"]}
      color={"#35407b"}
      fontSize={["12px", "md", "2xl"]}
    >
    <Box  p={"2%"}>

   
      <Input
        type="date"
        width={"35%"}
        onChange={(e) => getPizzaByDate(e)}
        bg={"white"}
      />
       </Box>
      {getAllPizzaEntry?.length === 0 ? (
        <>
          <Image p="3rem" src={Chef} />
        </>
      ) : (
        <TableContainer>
          <Table
            fontFamily={"Roboto Regular"}
            textAlign={"center"}
            variant="striped"
            border={"2px solid #fff"}
            borderRadius={"lg"}
            style={{ borderRadius: "5px !important" }}
            bgPos={"center"}
            bgColor={"#fff"}
            w={"100%"}
            whiteSpace={"nowrap"}
            size={["sm", "md", "lg"]}
          >
            <TableCaption>
              <Box
                pos={"relative"}
                left={"30%"}
                h={["10vh", "15vh", "20vh"]}
                w={"40%"}
                display={"flex"}
                alignContent={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
                bg={"#0a11aa69"}
                border={"1px solid"}
                borderRadius={"md"}
                fontSize={"2xl"}
                color={"white"}
              >
                {" "}
                <Box fontSize={"xl"}> Your Total:</Box>{" "}
                {NumberFormate(
                  getAllPizzaEntry?.reduce(
                    (total, pizza) => total + pizza.quantity * pizza.price,
                    0
                  )
                )}{" "}
                ₹
              </Box>
            </TableCaption>
            <Thead>
              <Tr>
                <Th
                  fontSize={["12px", "md", "2xl"]}
                  color={"#35407b"}
                  fontFamily={"Roboto Bold"}
                >
                  Pizza Name
                </Th>

                <Th
                  fontSize={["12px", "md", "2xl"]}
                  color={"#35407b"}
                  fontFamily={"Roboto Bold"}
                  textAlign={"center"}
                >
                  QUANTITY
                </Th>
                <Th
                  fontSize={["12px", "md", "2xl"]}
                  color={"#35407b"}
                  fontFamily={"Roboto Bold"}
                  textAlign={"center"}
                >
                  PRICE
                </Th>
                <Th
                  color={"#35407b"}
                  fontSize={["12px", "md", "2xl"]}
                  fontFamily={"Roboto Bold"}
                  textAlign={"center"}
                >
                  DATE & TIME
                </Th>
                <Th
                  color={"#ff0000"}
                  fontSize={["12px", "md", "2xl"]}
                  fontFamily={"Roboto Bold"}
                  textAlign={"center"}
                >
                  DELETE
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {getAllPizzaEntry?.map((pizza) => (
                <Tr key={pizza._id}>
                  <Td>
                    {pizza.PizzaName} ({pizza.price}₹)
                  </Td>
                  <Td textAlign={"center"}>
                    {" "}
                    <Flex align={"center"} gap={"5px"}>
                      {" "}
                      <Button
                        size={["xs", "sm", "lg"]}
                        isDisabled={pizza.quantity === 1 ? true : false}
                        onClick={() => {
                          setFlag(!flag);
                          patchDataToServer({
                            _id: pizza?._id,
                            quantity: pizza?.quantity - 1,
                          });
                          setFlag(!flag);
                        }}
                      >
                        <FiMinus />
                      </Button>{" "}
                      <Text fontSize={["sm", "md", "lg"]}>
                        {" "}
                        {pizza.quantity}
                      </Text>{" "}
                      <Button
                        size={["xs", "sm", "lg"]}
                        onClick={() => {
                          setFlag(!flag);

                          patchDataToServer({
                            _id: pizza?._id,
                            quantity: pizza?.quantity + 1,
                          });
                          setFlag(!flag);
                        }}
                      >
                        <GoPlus />
                      </Button>{" "}
                    </Flex>{" "}
                  </Td>
                  <Td textAlign={"center"}>
                    {NumberFormate(+pizza.quantity * pizza.price)}₹
                  </Td>
                  <Td>{new Date(pizza.createdAt).toLocaleTimeString()}</Td>
                  <Td
                    cursor={"pointer"}
                    textAlign={"center"}
                    onClick={() => handledelete(pizza?._id)}
                  >
                    <MdAutoDelete />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
