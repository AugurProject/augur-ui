import { connect } from "react-redux";

import AccountDeposit from "modules/account/components/account-deposit/account-deposit";
import { augur } from "services/augurjs";
import { assetDataUtils } from "@0xproject/order-utils";

const mapStateToProps = state => ({
  address: state.loginAccount.displayAddress
});

const mapDispatchToProps = () => ({
  openZeroExInstant: () => {
    augur.api.Universe.getReputationToken((err, repTokenAddress) => {
      if (err) return;

      const assetData = assetDataUtils.encodeERC20AssetData(repTokenAddress);

      // eslint-disable-next-line
      zeroExInstant.render(
        {
          availableAssetDatas: [],
          defaultSelectedAssetData: assetData,
          orderSource: "https://api.radarrelay.com/0x/v2"
        },
        "body"
      );
    });
  }
});

const AccountDepositContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDeposit);

export default AccountDepositContainer;
