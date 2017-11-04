<?php

class customError
{
    private $errorObj;
    private $errorClass;
    private $accountID;


    public function __construct($eClass, $errorArguments)
    {
      $this->errorClass = $eClass;
      $this->errorObj = new $eClass($errorArguments);
      $this->accountID = false; // TODO: get account id from ums-controller.
    }


    public function save()
    {
      $obj = array( 'error_object' => $this->errorObj->toJSON(),
                    'object_class' => $this->errorClass);

      Database::insert('fwk_error_log', $obj);
    }


    public function altSave()
    {
        return false;
    }
}
