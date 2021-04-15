import * as React from 'react';
import { registerForIntl, provideIntlService } from '@progress/kendo-react-intl';

class CurrencyFormatter extends React.Component {
    render() {
        return (
          <div className="col-xs-12 col-sm-6 example-col">
            {provideIntlService(this).formatNumber(100, 'c')}
          </div>
        );
    }
}

registerForIntl(CurrencyFormatter);

export { CurrencyFormatter };
