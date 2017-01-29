<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 1/16/2017
 * Time: 9:18 PM
 */

class ChickyDev_Dathang_IndexController extends Mage_Core_Controller_Front_Action {

    public function indexAction()
    {
        $this->loadLayout();
        $this->renderLayout();
    }

    public function addmotaAction()
    {
        $session = Mage::getSingleton('customer/session');
        $cart = Mage::getSingleton('checkout/cart');
        $cart->init();
        $productInstance = Mage::getModel('catalog/product')->load(1);
        $param = array(
            'product' => $productInstance->getId(),
            'name' => $this->getRequest()->getParam('url'),
            'url' => $this->getRequest()->getParam('url'),
            'qty' => $this->getRequest()->getParam('qty'),
            'price' => $this->getRequest()->getParam('gia'),
            'options' => array(
                0 => array(
                    'optionTitle' => "Mô Tả",
                    'optionValue' => $this->getRequest()->getParam('mota')
                )
            )
        );
        $request = new Varien_Object();
        $request->setData($param);
        $cart->addProduct($productInstance, $request);

        $session->setCartWasUpdated(true);
        $cart->save();
        $this->_redirect('checkout/cart');
    }
}