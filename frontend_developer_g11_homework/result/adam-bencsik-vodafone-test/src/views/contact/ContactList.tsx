import {
  Box,
  Container,
  Grid,
  Grow,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import AddButton from "../../components/Button/AddButton";
import Contact from "../../components/Card/Contact";
import { useHeader } from "../../components/Layout/HeaderContext";
import { ContactType } from "../../shared/common/types";
import { listContacts } from "../../shared/network/user.api";
import { useEffect, useState } from "react";
import { COLORS } from "../../shared/common/constants";

const useStyles = makeStyles({
  noDecoration: { textDecoration: "none", color: "initial" },
  filterButton: { width: 40, height: 40, color: "initial" },
});

const ContactList = () => {
  const classes = useStyles();
  const { setFooter, setLoading, loading, headerParam } = useHeader();
  const [filterableLetters, setFilterableLetters] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const userQuery = useQuery(["users", headerParam], async () => {
    setLoading(true);
    const data = await listContacts(9, 1, headerParam);
    setLoading(false);
    return data;
  });

  const users = userQuery?.data?.results || [];

  useEffect(() => {
    setFooter?.([<AddButton />]);
    return () => setFooter?.([]);
  }, [setFooter]);

  useEffect(() => {
    let letters: string[];
    letters = [];
    users.forEach((contact: ContactType) => {
      const currentLetter = contact.name.first[0];
      if (!letters.includes(currentLetter)) {
        letters.push(currentLetter);
      }
    });
    letters.sort((a: string, b: string) => a.localeCompare(b));
    setFilterableLetters(letters);
  }, [userQuery?.data?.results, setFilterableLetters]);

  function handleFilter(letter: string) {
    let tmp: string[];
    tmp = [];
    if (activeFilters.includes(letter)) {
      tmp = activeFilters.filter((currentLetter) => currentLetter !== letter);
    } else {
      tmp = [...activeFilters, letter];
    }
    tmp.sort((a: string, b: string) => a.localeCompare(b));
    setActiveFilters(tmp);
  }

  return (
    <Container maxWidth="lg">
      <Box width="100%" style={{ textAlign: "center", marginBottom: 16 }}>
        {filterableLetters.map((letter) => (
          <IconButton
            key={letter}
            className={classes.filterButton}
            onClick={() => handleFilter(letter)}
            style={{
              color: activeFilters.includes(letter)
                ? COLORS.mainLight
                : "initial",
            }}
          >
            {letter}
          </IconButton>
        ))}
      </Box>
      <Grid container spacing={2}>
        {!loading &&
          users
            ?.filter((contact: ContactType) => {
              if (!!activeFilters.length) {
                return activeFilters.includes(contact.name.first[0]);
              } else {
                return true;
              }
            })
            ?.map((contact: ContactType, index: number) => (
              <Grow in timeout={index * 300} key={index}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  component={Link}
                  to={`/contact/${contact.id.name || "Anonymus"}${
                    contact.id.value || "valueIsNull"
                  }`}
                  className={classes.noDecoration}
                >
                  <Contact contact={contact} />
                </Grid>
              </Grow>
            ))}
      </Grid>
    </Container>
  );
};

export default ContactList;
