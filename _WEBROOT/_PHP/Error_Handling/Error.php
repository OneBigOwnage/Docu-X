<?php

class Error
{
    private $errorObj;
    private $errorClass;
    private $accountID;


    public function __construct($eClass, $errorArguments)
    {
      $this->errorClass = $eClass;
      $this->errorObj = $eClass($errorArguments);
      $this->accountID = false; // TODO: get account id from ums-controller.
    }


    public function save()
    {
      //errorObj->toJSON();
      //Insert error into db, call altSave if saving to database fails.
    }


    public function altSave()
    {
        return true;
    }
}
