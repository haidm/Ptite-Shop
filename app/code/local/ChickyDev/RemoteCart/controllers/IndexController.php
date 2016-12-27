<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 12/2/2016
 * Time: 3:19 PM
 */

class ChickyDev_RemoteCart_IndexController extends Mage_Core_Controller_Front_Action {

    public function addAction()
    {
        $params = $this->getRequest()->getParams();
        var_dump($params);die;
    }

    public function getratingAction()
    {
        echo Mage::getStoreConfig('remotecart/settings/rating');
    }
}