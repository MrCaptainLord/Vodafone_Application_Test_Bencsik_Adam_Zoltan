import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import AddButton from "../../components/Button/AddButton";
import { useHeader } from "../../components/Layout/HeaderContext";
import { COLORS } from "../../shared/common/constants";
import { getContactById, modifyContact } from "../../shared/network/user.api";

const useStyles = makeStyles({
  wrapper: {
    width: "100%",
    maxWidth: 500,
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: { margin: 8 },
  inputLabel: {
    color: COLORS.lightGrey,
    fontSize: "1.25rem",
  },
});

type ContactFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

const ContactModify = () => {
  const { t } = useTranslation();
  const { setHeaderName, setLoading, setFooter } = useHeader();
  const classes = useStyles();
  const form = useForm<ContactFormValues>();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const id = params.id;
  const userQuery = useQuery([`contact_by_id_${id}`, id], async () => {
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
      form.setValue("firstName", contact.name?.first);
      form.setValue("lastName", contact.name?.last);
      form.setValue("phone", contact.phone);
      form.setValue("email", contact.email);
      return () => setHeaderName(null);
    }
  }, [contact, setHeaderName, form]);

  useEffect(() => {
    setFooter?.([<AddButton />]);
    return () => setFooter?.([]);
  }, [setFooter]);

  const onSubmit = async (values: ContactFormValues) => {
    setLoading(true);
    try {
      await modifyContact({
        ...contact,
        name: { first: values.firstName, last: values.lastName },
        email: values.email,
        phone: values.phone,
      });
      enqueueSnackbar(t("contact.modify.success")?.toString(), {
        variant: "success",
      });
    } catch {
      enqueueSnackbar(t("contact.modify.failure")?.toString(), {
        variant: "error",
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Grid container className={classes.wrapper} spacing={2}>
        <Grid item xs={4}>
          <Typography className={classes.inputLabel}>
            {t("contact.formValues.firstName")?.toString()}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Controller
            control={form.control}
            name="firstName"
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputLabelProps={{ shrink: false }}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.inputLabel}>
            {t("contact.formValues.lastName")?.toString()}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Controller
            control={form.control}
            defaultValue=""
            name="lastName"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputLabelProps={{ shrink: false }}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.inputLabel}>
            {t("contact.formValues.email")?.toString()}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Controller
            control={form.control}
            defaultValue=""
            name="email"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputLabelProps={{ shrink: false }}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.inputLabel}>
            {t("contact.formValues.phone")?.toString()}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Controller
            control={form.control}
            defaultValue=""
            name="phone"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputLabelProps={{ shrink: false, inlist: true }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} justifyContent="center" container>
          <Button variant="outlined" color="secondary" type="submit">
            {t("button.save.contact")?.toString()}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactModify;
