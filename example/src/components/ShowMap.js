import React from 'react';
import { Text } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import TabBarPage from './common/TabBarPage';
import Bubble from './common/Bubble';

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
    // Need to be before state; if not, it doesn't load

    this.state = {
      styleURL: this._mapOptions[0].data,
      featureCollection: MapboxGL.geoUtils.makeFeatureCollection(),
      loaded: false,
    };

    this.onPressIcon = this.onPressIcon.bind(this);
    this.mapHasLoaded = this.mapHasLoaded.bind(this);


    this.onMapChange = this.onMapChange.bind(this);
  }

  onMapChange (index, styleURL) {
    this.setState({ styleURL: styleURL });
  }

  async onPressIcon (e) {
    this.setState({
      featureCollection: MapboxGL.geoUtils.addToFeatureCollection(
        this.state.featureCollection,
        MapboxGL.geoUtils.makeFeature(e.geometry),
      ),
    });
  }

  mapHasLoaded (e) {
    // this.setState({
    //   loaded: true,
    // });
    console.log('mapHasLoaded: ', this.state.loaded);
  }

  render () {
    // console.log('MapboxGL.StyleURL: ', MapboxGL.StyleURL);
    console.log('this.state.loaded: ', this.state.loaded);
    return (
      <TabBarPage {...this.props} scrollable options={this._mapOptions} onOptionPress={this.onMapChange} ready={this.state.loaded}>
        <MapboxGL.MapView
            centerCoordinate={[106.6982,10.7715]}
            showUserLocation
            zoomLevel={14.6}
            minZoomLevel={11.8}
            pitch={45}
            userTrackingMode={MapboxGL.UserTrackingModes.Follow}
            onDidFinishLoadingMap={ this.mapHasLoaded }
            styleURL={this.state.styleURL}
            onDidFinishRenderingMap={  () => { this.setState({ loaded: true }) }  }
            onDidFinishLoadingStyle={ console.log('') }
            style={sheet.matchParent}>


            </MapboxGL.MapView>

      </TabBarPage>
    );
  }
}

export default ShowMap;
