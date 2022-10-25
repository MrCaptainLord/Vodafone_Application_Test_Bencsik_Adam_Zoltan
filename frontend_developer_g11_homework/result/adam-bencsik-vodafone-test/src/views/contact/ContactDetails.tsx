import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { buttonBaseClasses } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import AddButton from "../../components/Button/AddButton";
import { useHeader } from "../../components/Layout/HeaderContext";
import { ContactType } from "../../shared/common/types";
import { deleteContact, getContactById } from "../../shared/network/user.api";

const useStyles = makeStyles({
  thumbNailProfile: {
    width: 120,
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    marginLeft: "auto",
    marginRight: "auto",
  },
  bold: { fontWeight: 600 },
  container: {},
  wrapper: {
    width: "100%",
    maxWidth: 500,
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: { margin: 8 },
});

const ContactDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
  const { setHeaderName, setFooter, setLoading, loading } = useHeader();
  const classes = useStyles();
  const params = useParams();
  const id = params.id;
  const userQuery = useQuery([`user_by_id_${id}`, id], async () => {
    setLoading(true);
    if (!id) {
      setLoading(false);
      return Promise.reject();
    }
    const data = await getContactById(id);
    setLoading(false);
    return data;
  });
  const contact = userQuery?.data?.results[0];

  useEffect(() => {
    if (contact) {
      setHeaderName?.(`${contact.name.first} ${contact.name.last}'s Profile`);
      return () => setHeaderName(null);
    }
  }, [contact, setHeaderName]);

  useEffect(() => {
    setFooter?.([<AddButton />]);
    return () => setFooter?.([]);
  }, [setFooter]);

  return (
    <>
      <Grid container className={classes.wrapper}>
        {!loading ? (
          <>
            <Grid item xs={12} sm={4} container>
              <img
                src={contact?.picture?.large}
                alt=""
                className={classes.thumbNailProfile}
              />
            </Grid>
            <Grid item xs={12} sm={8} style={{ paddingLeft: 20, flexGrow: 5 }}>
              <Typography>{`${t("contact.email")}: ${
                contact?.email
              }`}</Typography>
              <Typography style={{ paddingTop: 6 }}>
                {`${t("contact.phone")}: ${contact?.phone}`}
              </Typography>
              <Typography style={{ paddingTop: 6 }}>
                {`${t("contact.address")}: ${
                  (contact as ContactType)?.location?.street?.name
                } ${(contact as ContactType)?.location?.street?.number}, ${
                  (contact as ContactType)?.location?.city
                }, ${(contact as ContactType)?.location?.state}`}
              </Typography>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Button
                variant="outlined"
                className={classes.button}
                onClick={async () => {
                  setOpen(true);
                }}
              >
                {t("button.delete")?.toString()}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                component={Link}
                to={`/contact-modify/${id}`}
              >
                {t("button.edit")?.toString()}
              </Button>
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Grid>
      <Dialog open={open}>
        <DialogTitle>
          {t("button.confirmation.delete.title", {
            subject: t("contact.subject"),
          })?.toString()}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {t("button.confirmation.delete.content", {
              subject: t("contact.subject"),
            })?.toString()}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpen(false)}
          >
            {t("button.no")?.toString()}
          </Button>
          <Button
            onClick={async () => {
              try {
                await deleteContact(contact);
                enqueueSnackbar(t("contact.delete.success")?.toString(), {
                  variant: "success",
                });
                setOpen(false);
                navigate("/");
              } catch {
                enqueueSnackbar(t("contact.delete.failure")?.toString(), {
                  variant: "error",
                });
              }
            }}
          >
            {t("button.yes")?.toString()}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ContactDetails;
