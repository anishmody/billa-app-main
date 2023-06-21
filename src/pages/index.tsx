import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ProductCard from "../components/ProductCard";
import { Product } from "@/interfaces/Product";

const API_URL = "http://localhost:3001/api/plan-list";

const Container = styled.div`
  background: white;
  width: 80vw;
  margin: 0 auto;
  padding: 20px;
`;

const Heading = styled.h1`
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #1b2a74;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const Badge = styled.span`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 15px;
  background-color: #007bff;
  color: #ffffff;
  font-size: 12px;
`;

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(API_URL, {});
        setProducts(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Heading>Product Listing</Heading>
      <Button>
        {" "}
        Electricity <Badge>{products.length}</Badge>{" "}
      </Button>
      <span style={{ display: "block" }}> 
        Initial recommendations are based on average medium usage as determined
        by relevant energy regulators, please view the information hover next to
        the estimated cost box for more information. For a more accurate
        comparison relevant to your circumstances, please use the Bill Details
        tab on the results page to enter your most recent energy bill details.
      </span>

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default ProductListingPage;
