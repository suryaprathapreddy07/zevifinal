import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Dialog,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
  Radio,
  RadioGroup,
} from "@mui/material";
import styles from "./Modal.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../assets/logo.png";
import { makeStyles } from "@mui/styles";
import Card from "./card";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rating from "@mui/material/Rating";
import { data } from "../../data/productData";
import { useState, useEffect } from "react";
import noData from "../../assets/nodata.png";

export type ViewProductDialogType = {
  openDialog: boolean;
  setOpenDialog: (val: any) => void;
};

const useStyles: any = makeStyles((theme: any) => ({
  input: {
    "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
      height: "100%",
      border: "none",
    },
    "&:hover": {
      backgroundcolor: "#000",
    },
  },
}));

const ViewProductDialog = ({
  openDialog,
  setOpenDialog,
}: ViewProductDialogType) => {
  const classes = useStyles();
  const [searchString, setSearchString] = useState("");
  const [filteredData, setFilteredData] = useState<any>();
  const [brands, setBrands] = useState<any>([]);

  useEffect(() => {
    setFilteredData(data);
    const brand = data?.map((item: any) => item.brand);
    const uniqueBrands = Array.from(new Set(brand));
    setBrands(uniqueBrands);
  }, [data]);

  useEffect(() => {
    const searchedData = data?.filter((item: any) =>
      item.name.toLowerCase().includes(searchString)
    );
    setFilteredData(searchedData);
  }, [searchString]);

  const handleCheckboxChange = (event: any) => {
    const itemName = event.target.value;

    if (itemName === "All") {
      setFilteredData(data);
    } else {
      const filteredBrand = data?.filter(
        (item: any) => itemName === item.brand
      );
      setFilteredData(filteredBrand);
    }
  };
  const handlePriceChange = (e: any) => {
    if (e.target.value === "Under 500") {
      const filteredPrice = filteredData?.filter((item: any) => {
        return item.price < 500;
      });
      setFilteredData(filteredPrice);
    } else if (e.target.value === "Above 500") {
      const filteredPrice = filteredData?.filter(
        (item: any) => item.price > 500
      );
      setFilteredData(filteredPrice);
    } else {
      setFilteredData(filteredData);
    }
  };

  return (
    <Dialog fullScreen open={openDialog} onClose={() => setOpenDialog(false)}>
      <div className={styles.dialogContainer}>
        <div className={styles.modalHeader}>
          <img height={30} width={70} src={logo} alt="logo" />
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpenDialog(false)}
            aria-label="close"
            className={styles.closeIcon}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className={styles.search}>
          {" "}
          <div className={styles.searchcontainer}>
            <TextField
              className={`${styles.textField} ${classes.input}`}
              placeholder="Search"
              onChange={(e) => setSearchString(e.target.value)}
              InputProps={{
                type: "search",
                endAdornment: <SearchIcon color="action" />,
              }}
            />
          </div>
        </div>

        <div className={styles.modalRootContainer}>
          <div className={styles.gridContainer}>
            <Grid container spacing={2} columns={12}>
              <Grid item xs={12} md={3} className={styles.gridContainer1}>
                <p className={styles.gridContainer1Header}>Search Results</p>
                <Accordion className={styles.accordian}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Brand</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      <RadioGroup defaultValue={"All"}>
                        <FormControlLabel
                          key={"All"}
                          control={
                            <Radio
                              onChange={handleCheckboxChange}
                              value={"All"}
                            />
                          }
                          label={"All"}
                        />
                        {brands?.map((item: any) => (
                          <FormControlLabel
                            key={item}
                            value={item}
                            control={
                              <Radio
                                onChange={handleCheckboxChange}
                                value={item}
                              />
                            }
                            label={item}
                          />
                        ))}
                      </RadioGroup>
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
                <Accordion className={styles.accordian}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Price Range</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      <RadioGroup defaultValue={"All"}>
                        <FormControlLabel
                          control={
                            <Radio value={"All"} onChange={handlePriceChange} />
                          }
                          label="All"
                        />
                        <FormControlLabel
                          control={
                            <Radio
                              value={"Under 500"}
                              onChange={handlePriceChange}
                            />
                          }
                          label="Under 500"
                        />
                        <FormControlLabel
                          control={
                            <Radio
                              value={"Above 500"}
                              onChange={handlePriceChange}
                            />
                          }
                          label="Above 500"
                        />
                      </RadioGroup>
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
                <Accordion className={styles.accordian}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Brand</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label={
                          <Rating readOnly name="simple-controlled" value={5} />
                        }
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label={
                          <Rating readOnly name="simple-controlled" value={4} />
                        }
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label={
                          <Rating readOnly name="simple-controlled" value={3} />
                        }
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label={
                          <Rating readOnly name="simple-controlled" value={2} />
                        }
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label={
                          <Rating readOnly name="simple-controlled" value={1} />
                        }
                      />
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              </Grid>

              {filteredData?.length > 0 ? (
                <Grid item xs={12} md={9} className={styles.gridContainer2}>
                  <div className={styles.cardsContainer}>
                    {filteredData?.map((item: any) => {
                      return (
                        <Card
                          img={item.image}
                          name={item.name}
                          brand={item.brand}
                          rating={item.rating}
                          price={item.price}
                          discount={item.discount}
                          isFavorite={item.isFavorite}
                          people={item.people}
                        />
                      );
                    })}
                  </div>
                </Grid>
              ) : (
                <Grid item xs={12} md={9} className={styles.gridContainer2}>
                  <img
                    className={styles.noData}
                    src={noData}
                    alt={"No data"}
                  ></img>
                </Grid>
              )}
            </Grid>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ViewProductDialog;
