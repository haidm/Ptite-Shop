<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 1/2/2017
 * Time: 12:34 PM
 */ 
class ChickyDev_RemoteCart_Model_Resource_Feeinfo extends Mage_Core_Model_Resource_Db_Abstract
{

    protected function _construct()
    {
        $this->_init('chickydev_remotecart/feeinfo', 'quote_id');
    }

}