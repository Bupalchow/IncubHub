import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ConnectWallet, useWeb3 } from "@fewcha/web3-react";
import React, { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Aptos } from "@aptos-labs/ts-sdk";
export default function FormDialog() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const { saccount, signAndSubmitTransaction } = useWallet();
  const [accountHasList, setAccountHasList] = useState(false);
  const [transactionInProgress, setTransactionInProgress] = useState(false);

  const [open, setOpen] = useState(false);
  const web3 = useWeb3();
  const { account, balance, isConnected, disconnect, network } = web3;
  const aptos = new Aptos();
  const moduleAddress = "0x2e725e85b90ffe9bda5c61f769653d980517dfc96be6f4f8be3bc7c629f1dab8";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const addNewList = async () => {
    if (!account) return [];
    setTransactionInProgress(true);

    const transaction = {
      data:{
        function:`${moduleAddress}::acoin::create_list`,
        functionArguments:[]
      }
    }
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      await aptos.waitForTransaction({transactionHash:response.hash});
      setAccountHasList(true);
    } catch (error) {
      setAccountHasList(false);
    } finally {
      setTransactionInProgress(false);
    }
  };
  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Connect
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the deatils to register your startup with IncubHub. 
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Project ID"
            label="Project ID"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Address"
            label="Address"
            type="address"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Name"
            label="Enter the name to be on the contract"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={addNewList}>Register</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}