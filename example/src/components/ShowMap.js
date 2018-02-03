import React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import TabBarPage from './common/TabBarPage';

import sheet from '../styles/sheet';
import exampleIcon from '../assets/example.png';
// import { onSortOptions } from '../utils';

const styleList = {
  Terminal: "mapbox://styles/richwood/cjbkiibly17pi2snys9thsau1",
  Exploration: "mapbox://styles/richwood/cjcrz5zbq1tkl2rpdctydxeqf",
  // Dark: "mapbox://styles/mapbox/dark-v9",
  Light: "mapbox://styles/mapbox/light-v9",
  Street: "mapbox://styles/mapbox/streets-v10",
  // Satellite: "mapbox://styles/mapbox/satellite-v9",
  // Outdoors: "mapbox://styles/mapbox/outdoors-v10",
  // SatelliteStreet: "mapbox://styles/mapbox/satellite-streets-v10",
  // TrafficDay: "mapbox://styles/mapbox/traffic-day-v2",
  // TrafficNight: "mapbox://styles/mapbox/traffic-night-v2",
}

const styles = MapboxGL.StyleSheet.create({
  icon: {
    iconImage: exampleIcon,
    iconAllowOverlap: true,
    iconSize: 0.5,
  },
})

class ShowMap extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor (props) {
    super(props);

    // this._mapOptions = Object.keys(MapboxGL.StyleURL).map((key) => {
    //   return {
    //     label: key,
    //     data: MapboxGL.StyleURL[key],
    //   };
    // }).sort(onSortOptions);

    this._mapOptions = Object.keys(styleList).map((key) => {
      return {
        label: key,
        data: styleList[key],
      };
    })

    this.state = {
      styleURL: this._mapOptions[0].data,
    };

    this.onMapChange = this.onMapChange.bind(this);
  }

  onMapChange (index, styleURL) {
    this.setState({ styleURL: styleURL });
  }

  render () {
    console.log('MapboxGL.StyleURL: ', MapboxGL.StyleURL);
    return (
      <TabBarPage {...this.props} scrollable options={this._mapOptions} onOptionPress={this.onMapChange}>
        <MapboxGL.MapView
            centerCoordinate={[106.6982,10.7715]}
            showUserLocation
            zoomLevel={14.6}
            minZoomLevel={11.8}
            pitch={45}
            userTrackingMode={MapboxGL.UserTrackingModes.Follow}
            styleURL={this.state.styleURL}
            style={sheet.matchParent} />
      </TabBarPage>
    );
  }
}

export default ShowMap;
