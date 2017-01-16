<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 12/2/2016
 * Time: 3:19 PM
 */ 
class ChickyDev_RemoteCart_Helper_Data extends Mage_Core_Helper_Abstract {

    public function getFeeInfo()
    {
        $quoteId = Mage::getSingleton("checkout/cart")->getQuote()->getId();
        $feeinfo = Mage::getModel('chickydev_remotecart/feeinfo')->load($quoteId);
        $info = unserialize($feeinfo->getInfo());
        return $info;
    }
}